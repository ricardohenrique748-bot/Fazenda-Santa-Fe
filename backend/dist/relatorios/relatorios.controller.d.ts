import { RelatoriosService } from './relatorios.service';
export declare class RelatoriosController {
    private readonly relatoriosService;
    constructor(relatoriosService: RelatoriosService);
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
