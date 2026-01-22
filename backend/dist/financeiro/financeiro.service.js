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
exports.FinanceiroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let FinanceiroService = class FinanceiroService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPlanoContas(data) {
        return this.prisma.planoContas.create({ data });
    }
    async findAllPlanoContas(empresaId) {
        return this.prisma.planoContas.findMany({
            where: { empresaId },
            orderBy: { codigo: 'asc' }
        });
    }
    async updatePlanoContas(id, empresaId, data) {
        return this.prisma.planoContas.update({
            where: { id, empresaId },
            data
        });
    }
    async removePlanoContas(id, empresaId) {
        return this.prisma.planoContas.delete({
            where: { id, empresaId }
        });
    }
    async createLancamento(data) {
        return this.prisma.lancamentoFinanceiro.create({
            data: {
                ...data,
                dataVencimento: new Date(data.dataVencimento),
                dataPagamento: data.dataPagamento ? new Date(data.dataPagamento) : null,
            }
        });
    }
    async findAllLancamentos(filters) {
        const { tipo, status, empresaId } = filters;
        return this.prisma.lancamentoFinanceiro.findMany({
            where: {
                tipo,
                status,
                empresaId
            },
            include: {
                planoContas: true,
                empresa: { select: { razaoSocial: true } }
            },
            orderBy: { dataVencimento: 'asc' }
        });
    }
    async updateLancamento(id, data) {
        return this.prisma.lancamentoFinanceiro.update({
            where: { id },
            data: {
                ...data,
                dataVencimento: data.dataVencimento ? new Date(data.dataVencimento) : undefined,
                dataPagamento: data.dataPagamento ? new Date(data.dataPagamento) : undefined,
            },
        });
    }
    async baixarLancamento(id, dataPagamento) {
        return this.prisma.lancamentoFinanceiro.update({
            where: { id },
            data: {
                status: client_1.StatusFinanceiro.PAGO,
                dataPagamento: new Date(dataPagamento)
            }
        });
    }
    async getFluxoCaixa(empresaId, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const lancamentos = await this.prisma.lancamentoFinanceiro.findMany({
            where: {
                empresaId,
                dataVencimento: {
                    gte: start,
                    lte: end
                },
                status: { not: client_1.StatusFinanceiro.CANCELADO }
            }
        });
        const resumo = {
            entradas: lancamentos.filter(l => l.tipo === 'RECEBER').reduce((acc, l) => acc + l.valor, 0),
            saidas: lancamentos.filter(l => l.tipo === 'PAGAR').reduce((acc, l) => acc + l.valor, 0),
            realizado: lancamentos.filter(l => l.status === 'PAGO').reduce((acc, l) => acc + (l.tipo === 'RECEBER' ? l.valor : -l.valor), 0),
            pendente: lancamentos.filter(l => l.status === 'PENDENTE').reduce((acc, l) => acc + (l.tipo === 'RECEBER' ? l.valor : -l.valor), 0),
        };
        return resumo;
    }
};
exports.FinanceiroService = FinanceiroService;
exports.FinanceiroService = FinanceiroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinanceiroService);
//# sourceMappingURL=financeiro.service.js.map