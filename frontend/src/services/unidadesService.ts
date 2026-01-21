import api from './api';

export interface UnidadeNegocio {
    id: string;
    nome: string;
    codigo?: string;
    empresaId: string;
    empresa?: {
        razaoSocial: string;
    }
}

export const unidadesService = {
    getAll: async () => {
        const response = await api.get<UnidadeNegocio[]>('/unidades-negocio');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<UnidadeNegocio>(`/unidades-negocio/${id}`);
        return response.data;
    },
    create: async (data: Partial<UnidadeNegocio>) => {
        const response = await api.post<UnidadeNegocio>('/unidades-negocio', data);
        return response.data;
    },
    update: async (id: string, data: Partial<UnidadeNegocio>) => {
        const response = await api.patch<UnidadeNegocio>(`/unidades-negocio/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/unidades-negocio/${id}`);
    },
};
