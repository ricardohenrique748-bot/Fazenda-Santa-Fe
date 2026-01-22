import { PedidosVendaService } from './pedidos-venda.service';
export declare class PedidosVendaController {
    private readonly pedidosService;
    constructor(pedidosService: PedidosVendaService);
    create(data: any, req: any): Promise<{
        cliente: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            telefone: string | null;
            ativo: boolean;
            empresaId: string;
            cidade: string | null;
            estado: string | null;
            inscricaoEstadual: string | null;
            nomeFantasia: string | null;
            razaoSocial: string;
            cpfCnpj: string;
            endereco: string | null;
        };
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
            valorUnitario: number;
            subtotal: number;
            produtoId: string;
            pedidoVendaId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        numero: number;
        dataPedido: Date;
        status: string;
        valorTotal: number;
        observacoes: string | null;
        clienteId: string;
    }>;
    findAll(req: any): Promise<({
        cliente: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            telefone: string | null;
            ativo: boolean;
            empresaId: string;
            cidade: string | null;
            estado: string | null;
            inscricaoEstadual: string | null;
            nomeFantasia: string | null;
            razaoSocial: string;
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
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        numero: number;
        dataPedido: Date;
        status: string;
        valorTotal: number;
        observacoes: string | null;
        clienteId: string;
    })[]>;
    findOne(id: string): Promise<({
        cliente: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            telefone: string | null;
            ativo: boolean;
            empresaId: string;
            cidade: string | null;
            estado: string | null;
            inscricaoEstadual: string | null;
            nomeFantasia: string | null;
            razaoSocial: string;
            cpfCnpj: string;
            endereco: string | null;
        };
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
            valorUnitario: number;
            subtotal: number;
            produtoId: string;
            pedidoVendaId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        numero: number;
        dataPedido: Date;
        status: string;
        valorTotal: number;
        observacoes: string | null;
        clienteId: string;
    }) | null>;
    update(id: string, data: any): Promise<{
        itens: {
            id: string;
            quantidade: number;
            valorUnitario: number;
            subtotal: number;
            produtoId: string;
            pedidoVendaId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        numero: number;
        dataPedido: Date;
        status: string;
        valorTotal: number;
        observacoes: string | null;
        clienteId: string;
    }>;
    remove(id: string): Promise<[import(".prisma/client").Prisma.BatchPayload, {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        empresaId: string;
        numero: number;
        dataPedido: Date;
        status: string;
        valorTotal: number;
        observacoes: string | null;
        clienteId: string;
    }]>;
}
