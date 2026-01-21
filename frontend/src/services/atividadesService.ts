import api from './api';

export interface Atividade {
    id: string;
    nome: string;
    descricao?: string;
}

export const atividadesService = {
    getAll: async () => {
        const response = await api.get<Atividade[]>('/atividades');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Atividade>(`/atividades/${id}`);
        return response.data;
    },
    create: async (data: Partial<Atividade>) => {
        const response = await api.post<Atividade>('/atividades', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Atividade>) => {
        const response = await api.patch<Atividade>(`/atividades/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/atividades/${id}`);
    },
};
