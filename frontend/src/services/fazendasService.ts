import api from './api';
import type { Empresa } from './empresasService';

export interface Fazenda {
    id: string;
    nome: string;
    codigo?: string;
    cidade?: string;
    estado?: string;
    areaTotal?: number;
    areaProdutiva?: number;
    empresaId: string;
    empresa?: Empresa; // For display purposes
}

export const fazendasService = {
    getAll: async () => {
        const response = await api.get<Fazenda[]>('/fazendas');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Fazenda>(`/fazendas/${id}`);
        return response.data;
    },
    create: async (data: Partial<Fazenda>) => {
        const response = await api.post<Fazenda>('/fazendas', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Fazenda>) => {
        const response = await api.patch<Fazenda>(`/fazendas/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/fazendas/${id}`);
    },
};
