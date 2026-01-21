import api from './api';

export interface Cultura {
    id: string;
    nome: string;
    variedade?: string;
    cicloDias?: number;
}

export const culturasService = {
    getAll: async () => {
        const response = await api.get<Cultura[]>('/culturas');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Cultura>(`/culturas/${id}`);
        return response.data;
    },
    create: async (data: Partial<Cultura>) => {
        const response = await api.post<Cultura>('/culturas', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Cultura>) => {
        const response = await api.patch<Cultura>(`/culturas/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/culturas/${id}`);
    },
};
