import api from './api';

export interface Municipio {
    id: string;
    nome: string;
    estado: string;
    codigoIbge?: string;
}

export const municipiosService = {
    getAll: async () => {
        const response = await api.get<Municipio[]>('/municipios');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Municipio>(`/municipios/${id}`);
        return response.data;
    },
    create: async (data: Partial<Municipio>) => {
        const response = await api.post<Municipio>('/municipios', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Municipio>) => {
        const response = await api.patch<Municipio>(`/municipios/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/municipios/${id}`);
    },
};
