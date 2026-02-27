import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, StatusFinanceiro, TipoLancamento, TipoMovimentacao } from '@prisma/client';

@Injectable()
export class NotasFiscaisService {
    constructor(private prisma: PrismaService) { }

    async importar(data: {
        nf: any;
        empresaId: string;
        planoContasId: string;
        depositoId?: string;
        enviarParaEstoque: boolean;
        usuarioId: string;
    }) {
        const { nf, empresaId, planoContasId, depositoId, enviarParaEstoque, usuarioId } = data;

        return this.prisma.$transaction(async (tx: any) => {
            // 1. Criar a Nota Fiscal
            const notaFiscal = await tx.notaFiscal.create({
                data: {
                    chaveAcesso: nf.chave,
                    numero: nf.numero,
                    serie: nf.serie || '1',
                    dataEmissao: new Date(nf.dataEmissao),
                    dataSaidaEntrada: nf.dataSaidaEntrada ? new Date(nf.dataSaidaEntrada) : null,
                    valorTotal: nf.valorTotal,
                    naturezaOperacao: nf.naturezaOperacao || 'COMPRA',
                    protocolo: nf.protocolo,
                    emitenteNome: nf.emitente.nome,
                    emitenteCnpj: nf.emitente.cnpj,
                    emitenteIe: nf.emitente.ie,
                    emitenteEndereco: nf.emitente.endereco,
                    emitenteCidade: nf.emitente.cidade,
                    emitenteUf: nf.emitente.uf,
                    destinatarioNome: nf.destinatario?.nome || '', // Supondo que pegamos do XML ou da empresa selecionada
                    destinatarioCnpj: nf.destinatario?.cnpj || '',
                    valorProdutos: nf.valorTotal, // Simplificando por enquanto
                    empresaId: empresaId,

                    itens: {
                        create: nf.itens.map((item) => ({
                            codigo: item.cod,
                            descricao: item.descricao,
                            ncm: item.ncm,
                            unidade: item.unidade,
                            quantidade: item.quantidade,
                            valorUnitario: item.valorUnitario,
                            valorTotal: item.valorTotal,
                        })),
                    },
                    duplicatas: {
                        create: nf.duplicatas.map((dup) => ({
                            numero: dup.numero,
                            dataVencimento: new Date(dup.vencimento),
                            valor: dup.valor,
                        })),
                    },
                },
            });

            // 2. Criar lançamentos financeiros
            if (nf.duplicatas.length > 0) {
                for (const dup of nf.duplicatas) {
                    await tx.lancamentoFinanceiro.create({
                        data: {
                            descricao: `NF ${nf.numero} - ${nf.emitente.nome} (Parc. ${dup.numero})`,
                            valor: dup.valor,
                            dataVencimento: new Date(dup.vencimento),
                            tipo: TipoLancamento.PAGAR,
                            planoContasId: planoContasId,
                            empresaId: empresaId,
                            status: StatusFinanceiro.PENDENTE,
                            notaFiscalId: notaFiscal.id,
                        },
                    });
                }
            } else {
                await tx.lancamentoFinanceiro.create({
                    data: {
                        descricao: `NF ${nf.numero} - ${nf.emitente.nome}`,
                        valor: nf.valorTotal,
                        dataVencimento: new Date(nf.dataEmissao),
                        tipo: TipoLancamento.PAGAR,
                        planoContasId: planoContasId,
                        empresaId: empresaId,
                        status: StatusFinanceiro.PENDENTE,
                        notaFiscalId: notaFiscal.id,
                    },
                });
            }

            // 3. Gerar entradas no estoque se solicitado
            if (enviarParaEstoque && depositoId) {
                for (const item of nf.itens) {
                    // Tentar encontrar o produto pelo código ou nome
                    let produto = await tx.produto.findFirst({
                        where: {
                            OR: [
                                { codigo: item.cod },
                                { nome: item.descricao }
                            ],
                            empresaId: empresaId
                        }
                    });

                    // Se não existir, cria o produto? (Opcional, mas útil)
                    if (!produto) {
                        produto = await tx.produto.create({
                            data: {
                                nome: item.descricao,
                                codigo: item.cod,
                                unidadeMedida: item.unidade,
                                empresaId: empresaId,
                            }
                        });
                    }

                    await tx.estoqueMovimentacao.create({
                        data: {
                            data: new Date(nf.dataSaidaEntrada || nf.dataEmissao),
                            tipo: TipoMovimentacao.ENTRADA,
                            quantidade: item.quantidade,
                            motivo: `Importação NF ${nf.numero}`,
                            depositoId: depositoId,
                            produtoId: produto.id,
                            usuarioId: usuarioId,
                            notaFiscalId: notaFiscal.id,
                        },
                    });

                    // Atualizar saldo
                    await tx.estoqueSaldo.upsert({
                        where: {
                            produtoId_depositoId: {
                                produtoId: produto.id,
                                depositoId: depositoId,
                            },
                        },
                        update: {
                            quantidade: { increment: item.quantidade },
                        },
                        create: {
                            produtoId: produto.id,
                            depositoId: depositoId,
                            quantidade: item.quantidade,
                        },
                    });
                }
            }

            return notaFiscal;
        });
    }

    async findAll(empresaId: string) {
        return this.prisma.notaFiscal.findMany({
            where: { empresaId },
            include: {
                itens: true,
                duplicatas: true,
            },
            orderBy: { dataEmissao: 'desc' },
        });
    }
}
