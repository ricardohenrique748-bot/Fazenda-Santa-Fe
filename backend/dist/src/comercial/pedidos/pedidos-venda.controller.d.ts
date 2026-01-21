import { PedidosVendaService } from './pedidos-venda.service';
export declare class PedidosVendaController {
    private readonly pedidosService;
    constructor(pedidosService: PedidosVendaService);
    create(data: any, req: any): Promise<{
        cliente: {
            id: string;
            email: string | null;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            ativo: boolean;
            cidade: string | null;
            estado: string | null;
            inscricaoEstadual: string | null;
            nomeFantasia: string | null;
            razaoSocial: string;
            telefone: string | null;
            cpfCnpj: string;
            endereco: string | null;
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
            quantidade: number;
            produtoId: string;
            valorUnitario: number;
            subtotal: number;
            pedidoVendaId: string;
        })[];
    } & {
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        numero: number;
        status: string;
        dataPedido: Date;
        valorTotal: number;
        observacoes: string | null;
        clienteId: string;
    }>;
    findAll(req: any): Promise<({
        cliente: {
            id: string;
            email: string | null;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            ativo: boolean;
            cidade: string | null;
            estado: string | null;
            inscricaoEstadual: string | null;
            nomeFantasia: string | null;
            razaoSocial: string;
            telefone: string | null;
            cpfCnpj: string;
            endereco: string | null;
        };
        itens: {
            id: string;
            quantidade: number;
            subtotal: number;
        }[];
    } & {
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        numero: number;
        status: string;
        dataPedido: Date;
        valorTotal: number;
        observacoes: string | null;
        clienteId: string;
    })[]>;
    findOne(id: string): Promise<({
        cliente: {
            id: string;
            email: string | null;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            ativo: boolean;
            cidade: string | null;
            estado: string | null;
            inscricaoEstadual: string | null;
            nomeFantasia: string | null;
            razaoSocial: string;
            telefone: string | null;
            cpfCnpj: string;
            endereco: string | null;
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
            quantidade: number;
            produtoId: string;
            valorUnitario: number;
            subtotal: number;
            pedidoVendaId: string;
        })[];
    } & {
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        numero: number;
        status: string;
        dataPedido: Date;
        valorTotal: number;
        observacoes: string | null;
        clienteId: string;
    }) | null>;
    update(id: string, data: any): Promise<{
        itens: {
            id: string;
            quantidade: number;
            produtoId: string;
            valorUnitario: number;
            subtotal: number;
            pedidoVendaId: string;
        }[];
    } & {
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        numero: number;
        status: string;
        dataPedido: Date;
        valorTotal: number;
        observacoes: string | null;
        clienteId: string;
    }>;
    remove(id: string): Promise<[import("@prisma/client").Prisma.BatchPayload, {
        id: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        numero: number;
        status: string;
        dataPedido: Date;
        valorTotal: number;
        observacoes: string | null;
        clienteId: string;
    }]>;
}
