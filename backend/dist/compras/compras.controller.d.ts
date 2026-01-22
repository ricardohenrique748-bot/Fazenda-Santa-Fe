import { ComprasService } from './compras.service';
export declare class ComprasController {
    private readonly comprasService;
    constructor(comprasService: ComprasService);
    getFornecedores(req: any): Promise<{
        id: string;
        email: string | null;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string;
        razaoSocial: string;
        telefone: string | null;
    }[]>;
    createFornecedor(data: any, req: any): Promise<{
        id: string;
        email: string | null;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string;
        razaoSocial: string;
        telefone: string | null;
    }>;
    getPedidos(req: any): Promise<({
        fornecedor: {
            id: string;
            email: string | null;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            cnpj: string;
            razaoSocial: string;
            telefone: string | null;
        };
        itens: ({
            produto: {
                id: string;
                nome: string;
                empresaId: string;
                createdAt: Date;
                updatedAt: Date;
                codigo: string | null;
                grupoId: string | null;
                unidadeMedida: string;
                categoria: string | null;
                fabricanteId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            quantidade: number;
            produtoId: string;
            valorUnitario: number;
            subtotal: number;
            pedidoId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        dataPedido: Date;
        valorTotal: number;
        fornecedorId: string;
    })[]>;
    createPedido(data: any, req: any): Promise<{
        fornecedor: {
            id: string;
            email: string | null;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            cnpj: string;
            razaoSocial: string;
            telefone: string | null;
        };
        itens: {
            id: string;
            createdAt: Date;
            quantidade: number;
            produtoId: string;
            valorUnitario: number;
            subtotal: number;
            pedidoId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        dataPedido: Date;
        valorTotal: number;
        fornecedorId: string;
    }>;
    getContratos(req: any): Promise<{
        safra: string;
        cliente: string | null;
        cultura: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dataVencimento: Date;
        status: string;
        clienteId: string | null;
        quantidadeTotal: number;
        valorPorUnidade: number;
    }[]>;
    createContrato(data: any, req: any): Promise<{
        safra: string;
        cliente: string | null;
        cultura: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dataVencimento: Date;
        status: string;
        clienteId: string | null;
        quantidadeTotal: number;
        valorPorUnidade: number;
    }>;
}
