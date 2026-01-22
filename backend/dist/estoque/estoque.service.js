"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let EstoqueService = class EstoqueService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMovimentacao(data) {
        const { produtoId, depositoId, quantidade, tipo, motivo, usuarioId, veiculoId, empresaId } = data;
        const produto = await this.prisma.produto.findUnique({ where: { id: produtoId } });
        if (!produto || produto.empresaId !== empresaId) {
            throw new common_1.BadRequestException('Produto não encontrado ou não pertence à sua empresa.');
        }
        const deposito = await this.prisma.deposito.findUnique({ where: { id: depositoId } });
        if (!deposito || deposito.empresaId !== empresaId) {
            throw new common_1.BadRequestException('Depósito não encontrado ou não pertence à sua empresa.');
        }
        return this.prisma.$transaction(async (tx) => {
            const movimentacao = await tx.estoqueMovimentacao.create({
                data: {
                    tipo,
                    quantidade,
                    motivo,
                    produto: { connect: { id: produtoId } },
                    deposito: { connect: { id: depositoId } },
                    usuario: { connect: { id: usuarioId } },
                    veiculoId
                },
            });
            const diff = (tipo === client_1.TipoMovimentacao.ENTRADA || tipo === client_1.TipoMovimentacao.AJUSTE && quantidade > 0)
                ? quantidade
                : -quantidade;
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
            if (tipo === client_1.TipoMovimentacao.SAIDA) {
                const updatedSaldo = await tx.estoqueSaldo.findUnique({
                    where: { produtoId_depositoId: { produtoId, depositoId } }
                });
                if (updatedSaldo && updatedSaldo.quantidade < 0) {
                    throw new common_1.BadRequestException('Saldo insuficiente no depósito');
                }
            }
            return movimentacao;
        });
    }
    async findAllMovimentacoes(empresaId) {
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
    async getSaldos(empresaId) {
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
    async transferirProduto(data) {
        const { produtoId, origemId, destinoId, quantidade, motivo, usuarioId, empresaId } = data;
        if (origemId === destinoId) {
            throw new common_1.BadRequestException('Origem e Destino devem ser diferentes.');
        }
        const produto = await this.prisma.produto.findUnique({ where: { id: produtoId } });
        if (!produto || produto.empresaId !== empresaId) {
            throw new common_1.BadRequestException('Produto não encontrado ou não pertence à empresa.');
        }
        const origem = await this.prisma.deposito.findUnique({ where: { id: origemId } });
        const destino = await this.prisma.deposito.findUnique({ where: { id: destinoId } });
        if (!origem || origem.empresaId !== empresaId || !destino || destino.empresaId !== empresaId) {
            throw new common_1.BadRequestException('Depósitos inválidos ou não pertencem à empresa.');
        }
        return this.prisma.$transaction(async (tx) => {
            const saldoOrigem = await tx.estoqueSaldo.findUnique({
                where: { produtoId_depositoId: { produtoId, depositoId: origemId } }
            });
            if (!saldoOrigem || saldoOrigem.quantidade < quantidade) {
                throw new common_1.BadRequestException(`Saldo insuficiente na origem. Disponível: ${saldoOrigem?.quantidade || 0}`);
            }
            await tx.estoqueMovimentacao.create({
                data: {
                    tipo: client_1.TipoMovimentacao.SAIDA,
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
            const movEntrada = await tx.estoqueMovimentacao.create({
                data: {
                    tipo: client_1.TipoMovimentacao.ENTRADA,
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
    async processarConferencia(data) {
        const { itens, usuarioId, empresaId, depositoId } = data;
        return this.prisma.$transaction(async (tx) => {
            const results = [];
            for (const item of itens) {
                const { produtoId, diferenca } = item;
                if (diferenca === 0)
                    continue;
                const produto = await tx.produto.findUnique({ where: { id: produtoId } });
                if (!produto || produto.empresaId !== empresaId) {
                    throw new common_1.BadRequestException(`Produto ${produtoId} inválido.`);
                }
                const tipo = diferenca > 0 ? client_1.TipoMovimentacao.AJUSTE : client_1.TipoMovimentacao.AJUSTE;
                const quantidadeAbs = Math.abs(diferenca);
                const isPositive = diferenca > 0;
                await tx.estoqueMovimentacao.create({
                    data: {
                        tipo: client_1.TipoMovimentacao.AJUSTE,
                        quantidade: quantidadeAbs,
                        motivo: `Conferência: ${isPositive ? 'Sobra' : 'Falta'} de estoque.`,
                        produtoId,
                        depositoId,
                        usuarioId
                    }
                });
                const incrementValue = diferenca;
                await tx.estoqueSaldo.upsert({
                    where: { produtoId_depositoId: { produtoId, depositoId } },
                    create: { produtoId, depositoId, quantidade: incrementValue > 0 ? incrementValue : 0 },
                    update: { quantidade: { increment: incrementValue } }
                });
                results.push({ produtoId, status: 'ok' });
            }
            return results;
        });
    }
};
exports.EstoqueService = EstoqueService;
exports.EstoqueService = EstoqueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EstoqueService);
//# sourceMappingURL=estoque.service.js.map