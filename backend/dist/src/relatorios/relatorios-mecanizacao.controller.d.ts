import { RelatoriosMecanizacaoService } from './relatorios-mecanizacao.service';
export declare class RelatoriosMecanizacaoController {
    private readonly relatoriosService;
    constructor(relatoriosService: RelatoriosMecanizacaoService);
    getDashboard(req: any): Promise<{
        kpis: {
            totalVeiculos: number;
            ativos: number;
            emManutencao: number;
            custoMensal: number;
        };
        frotaPorTipo: {
            name: import("@prisma/client").$Enums.TipoVeiculo;
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
