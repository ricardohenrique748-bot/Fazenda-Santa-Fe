import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PlanoContas, LancamentoFinanceiro } from '@prisma/client';
export declare class FinanceiroService {
    private prisma;
    constructor(prisma: PrismaService);
    createPlanoContas(data: Prisma.PlanoContasUncheckedCreateInput): Promise<PlanoContas>;
    findAllPlanoContas(empresaId: string): Promise<{
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
        descricao: string;
        tipo: import("@prisma/client").$Enums.TipoLancamento;
    }[]>;
    updatePlanoContas(id: string, empresaId: string, data: Prisma.PlanoContasUpdateInput): Promise<PlanoContas>;
    removePlanoContas(id: string, empresaId: string): Promise<PlanoContas>;
    createLancamento(data: any): Promise<LancamentoFinanceiro>;
    findAllLancamentos(filters: any): Promise<({
        empresa: {
            razaoSocial: string;
        };
        planoContas: {
            id: string;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            codigo: string | null;
            descricao: string;
            tipo: import("@prisma/client").$Enums.TipoLancamento;
        };
    } & {
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string;
        valor: number;
        dataVencimento: Date;
        dataPagamento: Date | null;
        status: import("@prisma/client").$Enums.StatusFinanceiro;
        tipo: import("@prisma/client").$Enums.TipoLancamento;
        planoContasId: string;
    })[]>;
    updateLancamento(id: string, data: any): Promise<LancamentoFinanceiro>;
    baixarLancamento(id: string, dataPagamento: string): Promise<LancamentoFinanceiro>;
    getFluxoCaixa(empresaId: string, startDate: string, endDate: string): Promise<{
        entradas: number;
        saidas: number;
        realizado: number;
        pendente: number;
    }>;
}
