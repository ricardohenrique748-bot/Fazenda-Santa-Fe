import api from './api';

export interface EPI {
    id: string;
    nome: string;
    ca?: string;
    validadeDias?: number;
    ativo: boolean;
}

export interface EntregaEPI {
    id: string;
    funcionarioId: string;
    funcionario?: { nome: string };
    epiId: string;
    epi?: EPI;
    dataEntrega: string;
    quantidade: number;
    observacao?: string;
}

export interface ExameOcupacional {
    id: string;
    funcionarioId: string;
    funcionario?: { nome: string };
    tipo: string;
    dataRealizacao: string;
    dataVencimento: string;
    resultado: string;
    medico?: string;
    crm?: string;
}

export const segurancaService = {
    // EPIs
    getEPIs: async () => {
        const response = await api.get<EPI[]>('/seguranca/epis');
        return response.data;
    },
    createEPI: async (data: Partial<EPI>) => {
        const response = await api.post<EPI>('/seguranca/epis', data);
        return response.data;
    },
    getEPIById: async (id: string) => {
        const response = await api.get<EPI>(`/seguranca/epis/${id}`);
        return response.data;
    },
    updateEPI: async (id: string, data: Partial<EPI>) => {
        const response = await api.patch<EPI>(`/seguranca/epis/${id}`, data);
        return response.data;
    },
    deleteEPI: async (id: string) => {
        await api.delete(`/seguranca/epis/${id}`);
    },

    // Entregas
    getEntregas: async (funcionarioId?: string) => {
        const response = await api.get<EntregaEPI[]>('/seguranca/entregas', {
            params: { funcionarioId }
        });
        return response.data;
    },
    createEntrega: async (data: Partial<EntregaEPI>) => {
        const response = await api.post<EntregaEPI>('/seguranca/entregas', data);
        return response.data;
    },

    // Exames
    getExames: async (funcionarioId?: string) => {
        const response = await api.get<ExameOcupacional[]>('/seguranca/exames', {
            params: { funcionarioId }
        });
        return response.data;
    },
    createExame: async (data: Partial<ExameOcupacional>) => {
        const response = await api.post<ExameOcupacional>('/seguranca/exames', data);
        return response.data;
    },
    getExameById: async (id: string) => {
        const response = await api.get<ExameOcupacional>(`/seguranca/exames/${id}`);
        return response.data;
    },
    updateExame: async (id: string, data: Partial<ExameOcupacional>) => {
        const response = await api.patch<ExameOcupacional>(`/seguranca/exames/${id}`, data);
        return response.data;
    },
    deleteExame: async (id: string) => {
        await api.delete(`/seguranca/exames/${id}`);
    },
};
