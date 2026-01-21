import api from './api';
import type { Empresa } from './empresasService';

export const Role = {
    ADMIN: 'ADMIN',
    GERENTE: 'GERENTE',
    OPERADOR: 'OPERADOR'
} as const;

export type Role = typeof Role[keyof typeof Role];

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    role: Role;
    cargo?: string;
    ativo: boolean;
    empresaId: string;
    empresa?: Empresa;
}

export const usuariosService = {
    getAll: async () => {
        const response = await api.get<Usuario[]>('/users');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Usuario>(`/users/${id}`);
        return response.data;
    },
    create: async (data: Partial<Usuario> & { senha?: string }) => {
        const response = await api.post<Usuario>('/users', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Usuario> & { senha?: string }) => {
        const response = await api.patch<Usuario>(`/users/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/users/${id}`);
    },
};
