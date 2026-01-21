import api from './api';
import type { Empresa } from './empresasService';

export const TipoMovimentacao = {
    ENTRADA: 'ENTRADA',
    SAIDA: 'SAIDA',
    AJUSTE: 'AJUSTE'
} as const;

export type TipoMovimentacao = typeof TipoMovimentacao[keyof typeof TipoMovimentacao];

export interface Produto {
    id: string;
    nome: string;
    codigo?: string;
    unidadeMedida: string;
    categoria?: string;
    estoques?: EstoqueSaldo[];
}

export interface Deposito {
    id: string;
    nome: string;
    localizacao?: string;
    empresaId: string;
    empresa?: Empresa;
}

export interface EstoqueSaldo {
    id: string;
    produtoId: string;
    produto?: Produto;
    depositoId: string;
    deposito?: Deposito;
    quantidade: number;
}

export interface EstoqueMovimentacao {
    id: string;
    data: string;
    tipo: TipoMovimentacao;
    quantidade: number;
    motivo?: string;
    produtoId: string;
    produto?: Produto;
    depositoId: string;
    deposito?: Deposito;
    usuarioId: string;
}

export const estoqueService = {
    // Produtos
    getProdutos: async () => {
        const response = await api.get<Produto[]>('/produtos');
        return response.data;
    },
    getProdutoById: async (id: string) => {
        const response = await api.get<Produto>(`/produtos/${id}`);
        return response.data;
    },
    createProduto: async (data: Partial<Produto>) => {
        const response = await api.post<Produto>('/produtos', data);
        return response.data;
    },

    // Depósitos
    getDepositos: async () => {
        const response = await api.get<Deposito[]>('/depositos');
        return response.data;
    },
    createDeposito: async (data: Partial<Deposito>) => {
        const response = await api.post<Deposito>('/depositos', data);
        return response.data;
    },
    getDepositoById: async (id: string) => {
        const response = await api.get<Deposito>(`/depositos/${id}`);
        return response.data;
    },
    updateDeposito: async (id: string, data: Partial<Deposito>) => {
        const response = await api.patch<Deposito>(`/depositos/${id}`, data);
        return response.data;
    },
    deleteDeposito: async (id: string) => {
        const response = await api.delete<Deposito>(`/depositos/${id}`);
        return response.data;
    },

    // Movimentações e Saldos
    getMovimentacoes: async () => {
        const response = await api.get<EstoqueMovimentacao[]>('/estoque/movimentacoes');
        return response.data;
    },
    getSaldos: async () => {
        const response = await api.get<EstoqueSaldo[]>('/estoque/saldos');
        return response.data;
    },
    createMovimentacao: async (data: any) => {
        const response = await api.post<EstoqueMovimentacao>('/estoque/movimentacoes', data);
        return response.data;
    },

    transferirProduto: async (data: any) => {
        const response = await api.post('/estoque/transferencias', data);
        return response.data;
    },

    processarConferencia: async (data: { itens: any[], depositoId: string }) => {
        const response = await api.post('/estoque/conferencia', data);
        return response.data;
    },

    // Grupos
    getGrupos: async () => {
        const response = await api.get('/grupos');
        return response.data;
    },
    createGrupo: async (data: any) => {
        const response = await api.post('/grupos', data);
        return response.data;
    },
    updateGrupo: async (id: string, data: any) => {
        const response = await api.patch(`/grupos/${id}`, data);
        return response.data;
    },
    deleteGrupo: async (id: string) => {
        const response = await api.delete(`/grupos/${id}`);
        return response.data;
    },

    // Fabricantes
    getFabricantes: async () => {
        const response = await api.get('/fabricantes');
        return response.data;
    },
    createFabricante: async (data: any) => {
        const response = await api.post('/fabricantes', data);
        return response.data;
    },
    updateFabricante: async (id: string, data: any) => {
        const response = await api.patch(`/fabricantes/${id}`, data);
        return response.data;
    },
    deleteFabricante: async (id: string) => {
        const response = await api.delete(`/fabricantes/${id}`);
        return response.data;
    }
};
