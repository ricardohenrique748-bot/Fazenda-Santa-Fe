import api from './api';

export interface Localizacao {
    id: string;
    nome: string;
    descricao?: string;
    fazendaId: string;
    fazenda?: {
        nome: string;
    }
}

export const localizacoesService = {
    getAll: async () => {
        const response = await api.get<Localizacao[]>('/localizacoes');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Localizacao>(`/localizacoes/${id}`);
        return response.data;
    },
    create: async (data: Partial<Localizacao>) => {
        const response = await api.post<Localizacao>('/localizacoes', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Localizacao>) => {
        const response = await api.patch<Localizacao>(`/localizacoes/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/localizacoes/${id}`);
    },
};
