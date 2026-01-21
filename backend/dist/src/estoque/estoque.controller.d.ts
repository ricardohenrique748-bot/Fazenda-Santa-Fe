import { EstoqueService } from './estoque.service';
export declare class EstoqueController {
    private readonly estoqueService;
    constructor(estoqueService: EstoqueService);
    create(data: any, req: any): Promise<{
        id: string;
        createdAt: Date;
        data: Date;
        tipo: import("@prisma/client").$Enums.TipoMovimentacao;
        quantidade: number;
        veiculoId: string | null;
        produtoId: string;
        depositoId: string;
        motivo: string | null;
        usuarioId: string;
    }>;
    transferir(data: any, req: any): Promise<any>;
    conferencia(data: any, req: any): Promise<any>;
    findAllMovimentacoes(req: any): Promise<({
        usuario: {
            nome: string;
        };
        deposito: {
            nome: string;
        };
        produto: {
            nome: string;
            unidadeMedida: string;
        };
    } & {
        id: string;
        createdAt: Date;
        data: Date;
        tipo: import("@prisma/client").$Enums.TipoMovimentacao;
        quantidade: number;
        veiculoId: string | null;
        produtoId: string;
        depositoId: string;
        motivo: string | null;
        usuarioId: string;
    })[]>;
    getSaldos(req: any): Promise<({
        deposito: {
            id: string;
            nome: string;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            localizacao: string | null;
        };
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
        depositoId: string;
    })[]>;
}
