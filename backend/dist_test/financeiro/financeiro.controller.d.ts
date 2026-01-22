import { FinanceiroService } from './financeiro.service';
import { Prisma } from '@prisma/client';
export declare class FinanceiroController {
    private readonly financeiroService;
    constructor(financeiroService: FinanceiroService);
    createPlanoContas(req: any, data: Prisma.PlanoContasCreateInput): Promise<{
        id: string;
        descricao: string;
        tipo: import(".prisma/client").$Enums.TipoLancamento;
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        codigo: string | null;
    }>;
    findAllPlanoContas(req: any): Promise<{
        id: string;
        descricao: string;
        tipo: import(".prisma/client").$Enums.TipoLancamento;
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        codigo: string | null;
    }[]>;
    updatePlanoContas(req: any, id: string, data: Prisma.PlanoContasUpdateInput): Promise<{
        id: string;
        descricao: string;
        tipo: import(".prisma/client").$Enums.TipoLancamento;
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        codigo: string | null;
    }>;
    removePlanoContas(req: any, id: string): Promise<{
        id: string;
        descricao: string;
        tipo: import(".prisma/client").$Enums.TipoLancamento;
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        codigo: string | null;
    }>;
    createLancamento(data: any): Promise<{
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
    }>;
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
    baixar(id: string, dataPagamento: string): Promise<{
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
    }>;
    getFluxoCaixa(req: any, startDate: string, endDate: string): Promise<{
        entradas: number;
        saidas: number;
        realizado: number;
        pendente: number;
    }>;
}
