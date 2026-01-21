import api from './api';
import type { Funcionario } from './funcionariosService';

export const TipoApontamento = {
    HORA_NORMAL: 'HORA_NORMAL',
    HORA_EXTRA: 'HORA_EXTRA',
    PRODUCAO: 'PRODUCAO',
    FALTA: 'FALTA'
} as const;

export type TipoApontamento = typeof TipoApontamento[keyof typeof TipoApontamento];

export interface Apontamento {
    id: string;
    data: string; // ISO DateTime
    quantidade: number;
    descricao?: string;
    tipo: TipoApontamento;
    funcionarioId: string;
    funcionario?: Funcionario;
    fazendaId?: string;
    fazenda?: { nome: string };
}

export const apontamentosService = {
    getAll: async () => {
        const response = await api.get<Apontamento[]>('/apontamentos');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<Apontamento>(`/apontamentos/${id}`);
        return response.data;
    },
    create: async (data: Partial<Apontamento>) => {
        const response = await api.post<Apontamento>('/apontamentos', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Apontamento>) => {
        const response = await api.patch<Apontamento>(`/apontamentos/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/apontamentos/${id}`);
    },
};
