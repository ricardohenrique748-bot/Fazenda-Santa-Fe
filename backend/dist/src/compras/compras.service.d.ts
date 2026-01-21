import { PrismaService } from '../prisma/prisma.service';
export declare class ComprasService {
    private prisma;
    constructor(prisma: PrismaService);
    createFornecedor(data: any, empresaId: string): Promise<{
        id: string;
        email: string | null;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string;
        razaoSocial: string;
        telefone: string | null;
    }>;
    getFornecedores(empresaId: string): Promise<{
        id: string;
        email: string | null;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string;
        razaoSocial: string;
        telefone: string | null;
    }[]>;
    createPedido(data: any, empresaId: string): Promise<{
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
    getPedidos(empresaId: string): Promise<({
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
    createContrato(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        safra: string;
        cliente: string | null;
        cultura: string;
        dataVencimento: Date;
        status: string;
        clienteId: string | null;
        quantidadeTotal: number;
        valorPorUnidade: number;
    }>;
    getContratos(empresaId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        safra: string;
        cliente: string | null;
        cultura: string;
        dataVencimento: Date;
        status: string;
        clienteId: string | null;
        quantidadeTotal: number;
        valorPorUnidade: number;
    }[]>;
}
