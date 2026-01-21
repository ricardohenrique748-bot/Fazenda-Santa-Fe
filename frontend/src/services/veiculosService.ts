import api from './api';
import type { Empresa } from './empresasService';

export const TipoVeiculo = {
    TRATOR: 'TRATOR',
    COLHEITADEIRA: 'COLHEITADEIRA',
    CAMINHAO: 'CAMINHAO',
    UTILITARIO: 'UTILITARIO',
    IMPLEMENTO: 'IMPLEMENTO'
} as const;

export type TipoVeiculo = typeof TipoVeiculo[keyof typeof TipoVeiculo];

export const StatusVeiculo = {
    ATIVO: 'ATIVO',
    MANUTENCAO: 'MANUTENCAO',
    INATIVO: 'INATIVO'
} as const;

export type StatusVeiculo = typeof StatusVeiculo[keyof typeof StatusVeiculo];

export interface Veiculo {
    id: string;
    nome: string;
    placa?: string;
    numeroFrota?: string;
    tipo: TipoVeiculo;
    marca?: string;
    modelo?: string;
    ano?: number;
    horimetroAtual: number;
    odometroAtual: number;
    status: StatusVeiculo;
    empresaId: string;
    empresa?: Empresa;
}

export const veiculosService = {
    getAll: async () => {
        const response = await api.get<Veiculo[]>('/veiculos');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Veiculo>(`/veiculos/${id}`);
        return response.data;
    },
    create: async (data: Partial<Veiculo>) => {
        const response = await api.post<Veiculo>('/veiculos', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Veiculo>) => {
        const response = await api.patch<Veiculo>(`/veiculos/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/veiculos/${id}`);
    },
};
