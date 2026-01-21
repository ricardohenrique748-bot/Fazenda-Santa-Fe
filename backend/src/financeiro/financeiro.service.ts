import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PlanoContas, LancamentoFinanceiro, StatusFinanceiro } from '@prisma/client';

@Injectable()
export class FinanceiroService {
    constructor(private prisma: PrismaService) { }

    // Plano de Contas
    async createPlanoContas(data: Prisma.PlanoContasUncheckedCreateInput): Promise<PlanoContas> {
        return this.prisma.planoContas.create({ data });
    }

    async findAllPlanoContas(empresaId: string) {
        return this.prisma.planoContas.findMany({
            where: { empresaId },
            orderBy: { codigo: 'asc' }
        });
    }

    async updatePlanoContas(id: string, empresaId: string, data: Prisma.PlanoContasUpdateInput): Promise<PlanoContas> {
        return this.prisma.planoContas.update({
            where: { id, empresaId },
            data
        });
    }

    async removePlanoContas(id: string, empresaId: string): Promise<PlanoContas> {
        return this.prisma.planoContas.delete({
            where: { id, empresaId }
        });
    }

    // Lançamentos
    async createLancamento(data: any): Promise<LancamentoFinanceiro> {
        return this.prisma.lancamentoFinanceiro.create({
            data: {
                ...data,
                dataVencimento: new Date(data.dataVencimento),
                dataPagamento: data.dataPagamento ? new Date(data.dataPagamento) : null,
            }
        });
    }

    async findAllLancamentos(filters: any) {
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

    async updateLancamento(id: string, data: any): Promise<LancamentoFinanceiro> {
        return this.prisma.lancamentoFinanceiro.update({
            where: { id },
            data: {
                ...data,
                dataVencimento: data.dataVencimento ? new Date(data.dataVencimento) : undefined,
                dataPagamento: data.dataPagamento ? new Date(data.dataPagamento) : undefined,
            },
        });
    }

    async baixarLancamento(id: string, dataPagamento: string): Promise<LancamentoFinanceiro> {
        return this.prisma.lancamentoFinanceiro.update({
            where: { id },
            data: {
                status: StatusFinanceiro.PAGO,
                dataPagamento: new Date(dataPagamento)
            }
        });
    }

    async getFluxoCaixa(empresaId: string, startDate: string, endDate: string) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const lancamentos = await this.prisma.lancamentoFinanceiro.findMany({
            where: {
                empresaId,
                dataVencimento: {
                    gte: start,
                    lte: end
                },
                status: { not: StatusFinanceiro.CANCELADO }
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
}
