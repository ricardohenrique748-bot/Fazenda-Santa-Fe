import { PrismaService } from '../prisma/prisma.service';
export declare class RelatoriosMecanizacaoService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardData(empresaId: string): Promise<{
        kpis: {
            totalVeiculos: number;
            ativos: number;
            emManutencao: number;
            custoMensal: number;
        };
        frotaPorTipo: {
            name: import(".prisma/client").$Enums.TipoVeiculo;
            value: number;
        }[];
        evolucaoCustos: {
            mes: string;
            valor: number;
        }[];
        topVeiculos: {
            nome: string;
            valor: number;
        }[];
    }>;
}
