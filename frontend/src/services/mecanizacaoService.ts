import api from './api';

export interface MecanizacaoReportData {
    kpis: {
        totalVeiculos: number;
        ativos: number;
        emManutencao: number;
        custoMensal: number;
    };
    frotaPorTipo: { name: string; value: number }[];
    evolucaoCustos: { mes: string; valor: number }[];
    topVeiculos: { nome: string; valor: number }[];
}

export const mecanizacaoService = {
    getDashboardData: async () => {
        const response = await api.get<MecanizacaoReportData>('/relatorios/mecanizacao/dashboard');
        return response.data;
    }
};
