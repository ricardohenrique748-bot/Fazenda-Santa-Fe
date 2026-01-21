import api from './api';

export interface Empresa {
    id: string;
    razaoSocial: string;
    nomeFantasia?: string;
    cnpj: string;
    inscricaoEstadual?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
    telefone?: string;
    email?: string;
    site?: string;
}

export const empresasService = {
    getAll: async () => {
        const response = await api.get<Empresa[]>('/empresas');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Empresa>(`/empresas/${id}`);
        return response.data;
    },
    create: async (data: Partial<Empresa>) => {
        const response = await api.post<Empresa>('/empresas', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Empresa>) => {
        const response = await api.patch<Empresa>(`/empresas/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/empresas/${id}`);
    },
};
