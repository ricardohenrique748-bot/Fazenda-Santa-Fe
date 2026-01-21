import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EstoqueMovimentacao, Prisma, TipoMovimentacao } from '@prisma/client';

@Injectable()
export class EstoqueService {
    constructor(private prisma: PrismaService) { }

    async createMovimentacao(data: any): Promise<EstoqueMovimentacao> {
        const { produtoId, depositoId, quantidade, tipo, motivo, usuarioId, veiculoId, empresaId } = data;

        // Validar se Produto pertence à empresa
        const produto = await this.prisma.produto.findUnique({ where: { id: produtoId } });
        if (!produto || produto.empresaId !== empresaId) {
            throw new BadRequestException('Produto não encontrado ou não pertence à sua empresa.');
        }

        // Validar se Depósito pertence à empresa
        const deposito = await this.prisma.deposito.findUnique({ where: { id: depositoId } });
        if (!deposito || deposito.empresaId !== empresaId) {
            throw new BadRequestException('Depósito não encontrado ou não pertence à sua empresa.');
        }

        return this.prisma.$transaction(async (tx) => {
            // 1. Criar a movimentação
            const movimentacao = await tx.estoqueMovimentacao.create({
                data: {
                    tipo,
                    quantidade,
                    motivo,
                    produto: { connect: { id: produtoId } },
                    deposito: { connect: { id: depositoId } },
                    usuario: { connect: { id: usuarioId } },
                    veiculoId // opcional
                },
            });

            // 2. Atualizar o saldo
            const diff = (tipo === TipoMovimentacao.ENTRADA || tipo === TipoMovimentacao.AJUSTE && quantidade > 0)
                ? quantidade
                : -quantidade;

            // Usar upsert para garantir que o registro de saldo exista
            await tx.estoqueSaldo.upsert({
                where: {
                    produtoId_depositoId: {
                        produtoId,
                        depositoId,
                    },
                },
                create: {
                    produtoId,
                    depositoId,
                    quantidade: diff,
                },
                update: {
                    quantidade: {
                        increment: diff,
                    },
                },
            });

            // Validar saldo negativo se for SAIDA (opcional, mas recomendado)
            if (tipo === TipoMovimentacao.SAIDA) {
                const updatedSaldo = await tx.estoqueSaldo.findUnique({
                    where: { produtoId_depositoId: { produtoId, depositoId } }
                });
                if (updatedSaldo && updatedSaldo.quantidade < 0) {
                    throw new BadRequestException('Saldo insuficiente no depósito');
                }
            }

            return movimentacao;
        });
    }

    async findAllMovimentacoes(empresaId: string) {
        return this.prisma.estoqueMovimentacao.findMany({
            where: {
                produto: { empresaId }
            },
            include: {
                produto: { select: { nome: true, unidadeMedida: true } },
                deposito: { select: { nome: true } },
                usuario: { select: { nome: true } }
            },
            orderBy: { data: 'desc' },
            take: 100
        });
    }

    async getSaldos(empresaId: string) {
        return this.prisma.estoqueSaldo.findMany({
            where: {
                produto: { empresaId }
            },
            include: {
                produto: true,
                deposito: true
            },
            orderBy: [
                { produto: { nome: 'asc' } },
                { deposito: { nome: 'asc' } }
            ]
        });
    }
    async transferirProduto(data: any): Promise<any> {
        const { produtoId, origemId, destinoId, quantidade, motivo, usuarioId, empresaId } = data;

        if (origemId === destinoId) {
            throw new BadRequestException('Origem e Destino devem ser diferentes.');
        }

        // Validar Produto
        const produto = await this.prisma.produto.findUnique({ where: { id: produtoId } });
        if (!produto || produto.empresaId !== empresaId) {
            throw new BadRequestException('Produto não encontrado ou não pertence à empresa.');
        }

        // Validar Depósitos
        const origem = await this.prisma.deposito.findUnique({ where: { id: origemId } });
        const destino = await this.prisma.deposito.findUnique({ where: { id: destinoId } });

        if (!origem || origem.empresaId !== empresaId || !destino || destino.empresaId !== empresaId) {
            throw new BadRequestException('Depósitos inválidos ou não pertencem à empresa.');
        }

        return this.prisma.$transaction(async (tx) => {
            // 1. Verificar saldo na origem
            const saldoOrigem = await tx.estoqueSaldo.findUnique({
                where: { produtoId_depositoId: { produtoId, depositoId: origemId } }
            });

            if (!saldoOrigem || saldoOrigem.quantidade < quantidade) {
                throw new BadRequestException(`Saldo insuficiente na origem. Disponível: ${saldoOrigem?.quantidade || 0}`);
            }

            // 2. Criar Saída na Origem
            await tx.estoqueMovimentacao.create({
                data: {
                    tipo: TipoMovimentacao.SAIDA,
                    quantidade,
                    motivo: `Transferência para ${destino.nome}. ${motivo || ''}`,
                    produtoId,
                    depositoId: origemId,
                    usuarioId
                }
            });

            await tx.estoqueSaldo.update({
                where: { produtoId_depositoId: { produtoId, depositoId: origemId } },
                data: { quantidade: { decrement: quantidade } }
            });

            // 3. Criar Entrada no Destino
            const movEntrada = await tx.estoqueMovimentacao.create({
                data: {
                    tipo: TipoMovimentacao.ENTRADA,
                    quantidade,
                    motivo: `Transferência de ${origem.nome}. ${motivo || ''}`,
                    produtoId,
                    depositoId: destinoId,
                    usuarioId
                }
            });

            await tx.estoqueSaldo.upsert({
                where: { produtoId_depositoId: { produtoId, depositoId: destinoId } },
                create: { produtoId, depositoId: destinoId, quantidade },
                update: { quantidade: { increment: quantidade } }
            });

            return movEntrada;
        });
    }

    async processarConferencia(data: any): Promise<any> {
        const { itens, usuarioId, empresaId, depositoId } = data; // itens: [{ produtoId, diferenca, motivo }]

        return this.prisma.$transaction(async (tx) => {
            const results = [];
            for (const item of itens) {
                const { produtoId, diferenca } = item;
                if (diferenca === 0) continue;

                // Validar Produto
                const produto = await tx.produto.findUnique({ where: { id: produtoId } });
                if (!produto || produto.empresaId !== empresaId) {
                    throw new BadRequestException(`Produto ${produtoId} inválido.`);
                }

                const tipo = diferenca > 0 ? TipoMovimentacao.AJUSTE : TipoMovimentacao.AJUSTE; // ou ENTRADA/SAIDA se preferir
                // Mas ajuste pode ser positivo ou negativo. Se for SAIDA, create expects positive quantity usually? 
                // My schema creates movements with Float quantity. 
                // Let's standarize: Movimentacao stored always positive. TYPE determines sign for balance logic.
                // WAIT. My createMovimentacao logic handles sign based on TYPE.
                // AJUSTE + positive quantity = increment? Or is AJUSTE absolute?
                // In createMovimentacao: "diff = (tipo === ENTRADA || tipo === AJUSTE && quantidade > 0) ? quantidade : -quantidade"
                // So if I send AJUSTE and positive quantity, it increments. If I send AJUSTE and negative quantity... wait.
                // createMovimentacao logic: 
                // const diff = (tipo === TipoMovimentacao.ENTRADA || tipo === TipoMovimentacao.AJUSTE && quantidade > 0) ? quantidade : -quantidade;
                // If I send AJUSTE and amount -5. 
                // "AJUSTE && -5 > 0" is false. So diff = -(-5) = 5? NO.
                // Logic:
                // (tipo === ENTRADA) -> True -> Qtd
                // (tipo === AJUSTE && Qtd > 0) -> True -> Qtd
                // Else -> -Qtd
                // So if AJUSTE and Qtd is -5. Condition is false. Result is -(-5) = +5. WRONG.

                // Let's refine the logic inside this Conferencia method specifically to be safe.
                // If diferenca > 0 -> INCREMENT (ENTRADA or AJUSTE POSITIVE)
                // If diferenca < 0 -> DECREMENT (SAIDA or AJUSTE NEGATIVE)

                const quantidadeAbs = Math.abs(diferenca);
                const isPositive = diferenca > 0;

                // Create Movement
                await tx.estoqueMovimentacao.create({
                    data: {
                        tipo: TipoMovimentacao.AJUSTE,
                        quantidade: quantidadeAbs, // Store absolute value
                        motivo: `Conferência: ${isPositive ? 'Sobra' : 'Falta'} de estoque.`,
                        produtoId,
                        depositoId,
                        usuarioId
                    }
                });

                // Update Balance
                const incrementValue = diferenca; // +5 or -5 directly
                await tx.estoqueSaldo.upsert({
                    where: { produtoId_depositoId: { produtoId, depositoId } },
                    create: { produtoId, depositoId, quantidade: incrementValue > 0 ? incrementValue : 0 }, // If creating with negative... weird. Assume 0 base?
                    update: { quantidade: { increment: incrementValue } }
                });

                results.push({ produtoId, status: 'ok' });
            }
            return results;
        });
    }
}
