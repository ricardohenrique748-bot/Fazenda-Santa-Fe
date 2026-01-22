import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PlanoContas, LancamentoFinanceiro } from '@prisma/client';
export declare class FinanceiroService {
    private prisma;
    constructor(prisma: PrismaService);
    createPlanoContas(data: Prisma.PlanoContasUncheckedCreateInput): Promise<PlanoContas>;
    findAllPlanoContas(empresaId: string): Promise<{
        id: string;
        descricao: string;
        tipo: import(".prisma/client").$Enums.TipoLancamento;
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        codigo: string | null;
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
            descricao: string;
            tipo: import(".prisma/client").$Enums.TipoLancamento;
            createdAt: Date;
            updatedAt: Date;
            empresaId: string;
            codigo: string | null;
        };
    } & {
        id: string;
        descricao: string;
        tipo: import(".prisma/client").$Enums.TipoLancamento;
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        status: import(".prisma/client").$Enums.StatusFinanceiro;
        dataVencimento: Date;
        valor: number;
        dataPagamento: Date | null;
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
