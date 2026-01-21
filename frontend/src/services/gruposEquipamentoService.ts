import api from './api';

export interface GrupoEquipamento {
    id: string;
    nome: string;
    descricao?: string;
    empresaId: string;
    _count?: {
        veiculos: number;
    };
    veiculos?: any[];
}

export const gruposEquipamentoService = {
    getAll: async () => {
        const response = await api.get('/grupos-equipamento');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get(`/grupos-equipamento/${id}`);
        return response.data;
    },
    create: async (data: Partial<GrupoEquipamento>) => {
        const response = await api.post('/grupos-equipamento', data);
        return response.data;
    },
    update: async (id: string, data: Partial<GrupoEquipamento>) => {
        const response = await api.patch(`/grupos-equipamento/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await api.delete(`/grupos-equipamento/${id}`);
        return response.data;
    },
};
