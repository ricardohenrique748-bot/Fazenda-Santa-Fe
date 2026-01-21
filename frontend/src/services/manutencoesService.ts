import api from './api';
import type { Veiculo } from './veiculosService';

export interface Manutencao {
    id: string;
    data: string;
    tipo: string;
    descricao: string;
    horimetroNoAto?: number;
    odometroNoAto?: number;
    custoTotal: number;
    veiculoId: string;
    veiculo?: Veiculo;
}

export const manutencoesService = {
    getAll: async () => {
        const response = await api.get<Manutencao[]>('/manutencoes');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Manutencao>(`/manutencoes/${id}`);
        return response.data;
    },
    create: async (data: Partial<Manutencao>) => {
        const response = await api.post<Manutencao>('/manutencoes', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Manutencao>) => {
        const response = await api.patch<Manutencao>(`/manutencoes/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/manutencoes/${id}`);
    },
};
