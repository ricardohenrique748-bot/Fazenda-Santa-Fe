import { PrismaService } from '../prisma/prisma.service';
export declare class RelatoriosService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardGeral(): Promise<{
        financeiro: {
            receitas: number;
            despesas: number;
        };
        frota: {
            totalVeiculos: number;
            custoManutencao: number;
        };
        suprimentos: {
            pedidosPendentes: number;
        };
        rh: {
            totalAtivos: number;
        };
        agricola: {
            areaTotalHectares: number;
        };
    }>;
    getCustoPorCultura(): Promise<{
        name: string;
        value: number;
    }[]>;
}
