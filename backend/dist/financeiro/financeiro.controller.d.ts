import { FinanceiroService } from './financeiro.service';
import { Prisma } from '@prisma/client';
export declare class FinanceiroController {
    private readonly financeiroService;
    constructor(financeiroService: FinanceiroService);
    createPlanoContas(req: any, data: Prisma.PlanoContasCreateInput): Promise<{
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
        descricao: string;
        tipo: import("@prisma/client").$Enums.TipoLancamento;
    }>;
    findAllPlanoContas(req: any): Promise<{
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
        descricao: string;
        tipo: import("@prisma/client").$Enums.TipoLancamento;
    }[]>;
    updatePlanoContas(req: any, id: string, data: Prisma.PlanoContasUpdateInput): Promise<{
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
        descricao: string;
        tipo: import("@prisma/client").$Enums.TipoLancamento;
    }>;
    removePlanoContas(req: any, id: string): Promise<{
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
        descricao: string;
        tipo: import("@prisma/client").$Enums.TipoLancamento;
    }>;
    createLancamento(data: any): Promise<{
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
    }>;
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
    baixar(id: string, dataPagamento: string): Promise<{
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
    }>;
    getFluxoCaixa(req: any, startDate: string, endDate: string): Promise<{
        entradas: number;
        saidas: number;
        realizado: number;
        pendente: number;
    }>;
}
