import { PrismaService } from '../prisma/prisma.service';
export declare class ComprasService {
    private prisma;
    constructor(prisma: PrismaService);
    createFornecedor(data: any, empresaId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        telefone: string | null;
        empresaId: string;
        cnpj: string;
        razaoSocial: string;
    }>;
    getFornecedores(empresaId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        telefone: string | null;
        empresaId: string;
        cnpj: string;
        razaoSocial: string;
    }[]>;
    createPedido(data: any, empresaId: string): Promise<{
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
    getPedidos(empresaId: string): Promise<({
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
    createContrato(data: any): Promise<{
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
    getContratos(empresaId: string): Promise<{
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
}
