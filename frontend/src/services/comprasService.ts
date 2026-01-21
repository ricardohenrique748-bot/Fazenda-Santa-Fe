import api from './api';

export interface Fornecedor {
    id: string;
    razaoSocial: string;
    cnpj: string;
    email?: string;
    telefone?: string;
}

export interface ItemPedido {
    id: string;
    pedidoId: string;
    produtoId: string;
    produto?: { nome: string; unidadeMedida: string };
    quantidade: number;
    valorUnitario: number;
    subtotal: number;
}

export interface PedidoCompra {
    id: string;
    fornecedorId: string;
    fornecedor?: Fornecedor;
    dataPedido: string;
    valorTotal: number;
    status: string;
    itens?: ItemPedido[];
}

export interface ContratoComercial {
    id: string;
    cliente: string;
    cultura: string;
    safra: string;
    quantidadeTotal: number;
    valorPorUnidade: number;
    dataVencimento: string;
    status: string;
}

export const comprasService = {
    // Fornecedores
    getFornecedores: async () => {
        const response = await api.get<Fornecedor[]>('/compras/fornecedores');
        return response.data;
    },
    createFornecedor: async (data: Partial<Fornecedor>) => {
        const response = await api.post<Fornecedor>('/compras/fornecedores', data);
        return response.data;
    },

    // Pedidos
    getPedidos: async () => {
        const response = await api.get<PedidoCompra[]>('/compras/pedidos');
        return response.data;
    },
    createPedido: async (data: any) => {
        const response = await api.post<PedidoCompra>('/compras/pedidos', data);
        return response.data;
    },

    // Contratos
    getContratos: async () => {
        const response = await api.get<ContratoComercial[]>('/compras/contratos');
        return response.data;
    },
    createContrato: async (data: Partial<ContratoComercial>) => {
        const response = await api.post<ContratoComercial>('/compras/contratos', data);
        return response.data;
    },
};
