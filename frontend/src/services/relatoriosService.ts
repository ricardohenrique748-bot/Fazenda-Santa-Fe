import api from './api';

export interface DashboardData {
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
}

export interface ChartData {
    name: string;
    value: number;
}

export const relatoriosService = {
    getDashboardGeral: async () => {
        const response = await api.get<DashboardData>('/relatorios/dashboard-geral');
        return response.data;
    },
    getCustoPorCultura: async () => {
        const response = await api.get<ChartData[]>('/relatorios/custo-cultura');
        return response.data;
    },
};
