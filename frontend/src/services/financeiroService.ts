import api from './api';

export const StatusFinanceiro = {
    PENDENTE: 'PENDENTE',
    PAGO: 'PAGO',
    CANCELADO: 'CANCELADO'
} as const;

export type StatusFinanceiro = typeof StatusFinanceiro[keyof typeof StatusFinanceiro];

export const TipoLancamento = {
    PAGAR: 'PAGAR',
    RECEBER: 'RECEBER'
} as const;

export type TipoLancamento = typeof TipoLancamento[keyof typeof TipoLancamento];

export interface PlanoContas {
    id: string;
    codigo?: string;
    descricao: string;
    tipo: TipoLancamento;
}

export interface LancamentoFinanceiro {
    id: string;
    descricao: string;
    valor: number;
    dataVencimento: string;
    dataPagamento?: string;
    status: StatusFinanceiro;
    tipo: TipoLancamento;
    planoContasId: string;
    planoContas?: PlanoContas;
    empresaId: string;
}

export const financeiroService = {
    // Plano de Contas
    getPlanoContas: async () => {
        const response = await api.get<PlanoContas[]>('/financeiro/plano-contas');
        return response.data;
    },
    createPlanoContas: async (data: Partial<PlanoContas>) => {
        const response = await api.post<PlanoContas>('/financeiro/plano-contas', data);
        return response.data;
    },
    updatePlanoContas: async (id: string, data: Partial<PlanoContas>) => {
        const response = await api.patch<PlanoContas>(`/financeiro/plano-contas/${id}`, data);
        return response.data;
    },
    deletePlanoContas: async (id: string) => {
        const response = await api.delete<PlanoContas>(`/financeiro/plano-contas/${id}`);
        return response.data;
    },

    // Lançamentos
    getLancamentos: async (filters: any = {}) => {
        const response = await api.get<LancamentoFinanceiro[]>('/financeiro/lancamentos', { params: filters });
        return response.data;
    },
    createLancamento: async (data: any) => {
        const response = await api.post<LancamentoFinanceiro>('/financeiro/lancamentos', data);
        return response.data;
    },
    baixarLancamento: async (id: string, dataPagamento: string) => {
        const response = await api.patch<LancamentoFinanceiro>(`/financeiro/lancamentos/${id}/baixar`, { dataPagamento });
        return response.data;
    },

    // Dashboards
    getFluxoCaixa: async (startDate: string, endDate: string) => {
        const response = await api.get('/financeiro/fluxo-caixa', { params: { startDate, endDate } });
        return response.data;
    }
};
