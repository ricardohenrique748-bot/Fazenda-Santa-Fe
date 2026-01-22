import { EstoqueService } from './estoque.service';
export declare class EstoqueController {
    private readonly estoqueService;
    constructor(estoqueService: EstoqueService);
    create(data: any, req: any): Promise<{
        id: string;
        data: Date;
        quantidade: number;
        tipo: import(".prisma/client").$Enums.TipoMovimentacao;
        createdAt: Date;
        produtoId: string;
        depositoId: string;
        motivo: string | null;
        veiculoId: string | null;
        usuarioId: string;
    }>;
    transferir(data: any, req: any): Promise<any>;
    conferencia(data: any, req: any): Promise<any>;
    findAllMovimentacoes(req: any): Promise<({
        usuario: {
            nome: string;
        };
        produto: {
            nome: string;
            unidadeMedida: string;
        };
        deposito: {
            nome: string;
        };
    } & {
        id: string;
        data: Date;
        quantidade: number;
        tipo: import(".prisma/client").$Enums.TipoMovimentacao;
        createdAt: Date;
        produtoId: string;
        depositoId: string;
        motivo: string | null;
        veiculoId: string | null;
        usuarioId: string;
    })[]>;
    getSaldos(req: any): Promise<({
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
        deposito: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            nome: string;
            empresaId: string;
            localizacao: string | null;
        };
    } & {
        id: string;
        quantidade: number;
        produtoId: string;
        depositoId: string;
    })[]>;
}
