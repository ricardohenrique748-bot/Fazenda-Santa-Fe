import api from './api';

export interface Safra {
    id: string;
    nome: string;
    dataInicio: string;
    dataFim: string;
    ativo: boolean;
    _count?: { planejamentos: number };
}

export interface Planejamento {
    id: string;
    fazendaId: string;
    talhaoId?: string | null;
    safraId: string;
    culturaId?: string | null;
    cultura?: string; // Legacy or computed
    areaHectares: number;
    metaProdutividade?: number | null;
    unidadeProdutividade?: string | null;
    custoEstimadoTotal?: number | null;
    custoPorHa?: number | null;
    fazenda?: { nome: string };
    safra?: { nome: string };
    talhao?: { nome: string };
    itens?: ItemPlanejamento[];
    atividades?: AtividadePlanejada[];
    _count?: { itens: number; atividades: number };
}

export interface ItemPlanejamento {
    id: string;
    produtoId: string;
    produto?: { nome: string; unidadeMedida: string };
    doseHa: number;
    quantidadeTotal: number;
}

export interface AtividadePlanejada {
    id: string;
    descricao: string;
    dataPrevista: string;
    status: 'PLANEJADO' | 'EM_ANDAMENTO' | 'CONCLUIDO';
    etapa?: string | null;
}

export const planejamentoService = {
    // Safras
    getSafras: async (): Promise<Safra[]> => {
        const response = await api.get('/planejamento/safras');
        return response.data;
    },
    createSafra: async (data: Partial<Safra>): Promise<Safra> => {
        const response = await api.post('/planejamento/safras', data);
        return response.data;
    },

    // Planejamentos
    getPlanejamentos: async (safraId?: string): Promise<Planejamento[]> => {
        const response = await api.get('/planejamento', { params: { safraId } });
        return response.data;
    },
    getPlanejamentoById: async (id: string): Promise<Planejamento> => {
        const response = await api.get(`/planejamento/${id}`);
        return response.data;
    },
    createPlanejamento: async (data: any): Promise<Planejamento> => {
        const response = await api.post('/planejamento', data);
        return response.data;
    },
    deletePlanejamento: async (id: string): Promise<void> => {
        await api.delete(`/planejamento/${id}`);
    },

    // Cronograma
    getCronograma: async (start: string, end: string): Promise<AtividadePlanejada[]> => {
        const response = await api.get('/planejamento/cronograma', { params: { start, end } });
        return response.data;
    }
};
