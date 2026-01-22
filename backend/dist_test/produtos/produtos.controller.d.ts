import { ProdutosService } from './produtos.service';
import { Prisma } from '@prisma/client';
export declare class ProdutosController {
    private readonly produtosService;
    constructor(produtosService: ProdutosService);
    create(data: Prisma.ProdutoCreateInput, req: any): Promise<{
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
    }>;
    findAll(req: any): Promise<({
        estoques: ({
            deposito: {
                nome: string;
            };
        } & {
            id: string;
            quantidade: number;
            produtoId: string;
            depositoId: string;
        })[];
    } & {
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
    })[]>;
    findOne(id: string, req: any): Promise<{
        movimentacoes: ({
            usuario: {
                nome: string;
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
            data: Date;
            quantidade: number;
            tipo: import(".prisma/client").$Enums.TipoMovimentacao;
            createdAt: Date;
            produtoId: string;
            depositoId: string;
            motivo: string | null;
            veiculoId: string | null;
            usuarioId: string;
        })[];
        estoques: ({
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
        })[];
    } & {
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
    }>;
    update(id: string, data: Prisma.ProdutoUpdateInput, req: any): Promise<{
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
    }>;
    remove(id: string, req: any): Promise<{
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
    }>;
}
