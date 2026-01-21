import api from './api';
import type { Empresa } from './empresasService';

export interface Funcionario {
    id: string;
    nome: string;
    cpf: string;
    email?: string;
    telefone?: string;
    cargo: string;
    dataAdmissao: string; // ISO Date
    salario?: number;
    ativo: boolean;
    empresaId: string;
    empresa?: Empresa;
}

export const funcionariosService = {
    getAll: async () => {
        const response = await api.get<Funcionario[]>('/funcionarios');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Funcionario>(`/funcionarios/${id}`);
        return response.data;
    },
    create: async (data: Partial<Funcionario>) => {
        const response = await api.post<Funcionario>('/funcionarios', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Funcionario>) => {
        const response = await api.patch<Funcionario>(`/funcionarios/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/funcionarios/${id}`);
    },
};
