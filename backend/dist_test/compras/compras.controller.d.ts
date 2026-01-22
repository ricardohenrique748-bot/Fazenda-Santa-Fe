import { ComprasService } from './compras.service';
export declare class ComprasController {
    private readonly comprasService;
    constructor(comprasService: ComprasService);
    getFornecedores(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        telefone: string | null;
        empresaId: string;
        cnpj: string;
        razaoSocial: string;
    }[]>;
    createFornecedor(data: any, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        telefone: string | null;
        empresaId: string;
        cnpj: string;
        razaoSocial: string;
    }>;
    getPedidos(req: any): Promise<({
        itens: ({
            produto: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                nome: string;
                empresaId: string;
                codigo: string | null;
                unidadeMedida: string;
                categoria: string | null;
                grupoId: string | null;
                fabricanteId: string | null;
            };
        } & {
            id: string;
            quantidade: number;
            createdAt: Date;
            valorUnitario: number;
            subtotal: number;
            produtoId: string;
            pedidoId: string;
        })[];
        fornecedor: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            telefone: string | null;
            empresaId: string;
            cnpj: string;
            razaoSocial: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dataPedido: Date;
        status: string;
        valorTotal: number;
        fornecedorId: string;
    })[]>;
    createPedido(data: any, req: any): Promise<{
        itens: {
            id: string;
            quantidade: number;
            createdAt: Date;
            valorUnitario: number;
            subtotal: number;
            produtoId: string;
            pedidoId: string;
        }[];
        fornecedor: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            telefone: string | null;
            empresaId: string;
            cnpj: string;
            razaoSocial: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dataPedido: Date;
        status: string;
        valorTotal: number;
        fornecedorId: string;
    }>;
    getContratos(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cultura: string;
        cliente: string | null;
        status: string;
        clienteId: string | null;
        safra: string;
        quantidadeTotal: number;
        valorPorUnidade: number;
        dataVencimento: Date;
    }[]>;
    createContrato(data: any, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        cultura: string;
        cliente: string | null;
        status: string;
        clienteId: string | null;
        safra: string;
        quantidadeTotal: number;
        valorPorUnidade: number;
        dataVencimento: Date;
    }>;
}
