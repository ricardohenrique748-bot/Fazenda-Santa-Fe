import api from './api';

export interface Cliente {
    id: string;
    razaoSocial: string;
    nomeFantasia?: string;
    cpfCnpj: string;
    inscricaoEstadual?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    ativo: boolean;
    createdAt?: string;
}

export interface ItemPedidoVenda {
    id: string;
    produtoId: string;
    quantidade: number;
    valorUnitario: number;
    subtotal: number;
    produto?: {
        nome: string;
        unidadeMedida: string;
    };
}

export interface PedidoVenda {
    id: string;
    numero: number;
    clienteId: string;
    cliente?: Cliente;
    dataPedido: string;
    status: string;
    valorTotal: number;
    observacoes?: string;
    itens: ItemPedidoVenda[];
    createdAt?: string;
}

export const comercialService = {
    // Clientes
    getClientes: async (): Promise<Cliente[]> => {
        const response = await api.get('/comercial/clientes');
        return response.data;
    },

    getClienteById: async (id: string): Promise<Cliente> => {
        const response = await api.get(`/comercial/clientes/${id}`);
        return response.data;
    },

    createCliente: async (data: Omit<Cliente, 'id'>): Promise<Cliente> => {
        const response = await api.post('/comercial/clientes', data);
        return response.data;
    },

    updateCliente: async (id: string, data: Partial<Cliente>): Promise<Cliente> => {
        const response = await api.patch(`/comercial/clientes/${id}`, data);
        return response.data;
    },

    deleteCliente: async (id: string): Promise<void> => {
        await api.delete(`/comercial/clientes/${id}`);
    },

    // Pedidos de Venda
    getPedidos: async (): Promise<PedidoVenda[]> => {
        const response = await api.get('/comercial/pedidos-venda');
        return response.data;
    },

    getPedidoById: async (id: string): Promise<PedidoVenda> => {
        const response = await api.get(`/comercial/pedidos-venda/${id}`);
        return response.data;
    },

    createPedido: async (data: Partial<PedidoVenda>): Promise<PedidoVenda> => {
        const response = await api.post('/comercial/pedidos-venda', data);
        return response.data;
    },

    updatePedido: async (id: string, data: Partial<PedidoVenda>): Promise<PedidoVenda> => {
        const response = await api.patch(`/comercial/pedidos-venda/${id}`, data);
        return response.data;
    },

    deletePedido: async (id: string): Promise<void> => {
        await api.delete(`/comercial/pedidos-venda/${id}`);
    }
};
