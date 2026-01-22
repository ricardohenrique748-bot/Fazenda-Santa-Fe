import { ProdutosService } from './produtos.service';
import { Prisma } from '@prisma/client';
export declare class ProdutosController {
    private readonly produtosService;
    constructor(produtosService: ProdutosService);
    create(data: Prisma.ProdutoCreateInput, req: any): Promise<{
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
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
        grupoId: string | null;
        unidadeMedida: string;
        categoria: string | null;
        fabricanteId: string | null;
    })[]>;
    findOne(id: string, req: any): Promise<{
        movimentacoes: ({
            usuario: {
                nome: string;
            };
            deposito: {
                localizacao: string | null;
                id: string;
                nome: string;
                empresaId: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            data: Date;
            tipo: import("@prisma/client").$Enums.TipoMovimentacao;
            quantidade: number;
            veiculoId: string | null;
            motivo: string | null;
            produtoId: string;
            depositoId: string;
            usuarioId: string;
        })[];
        estoques: ({
            deposito: {
                localizacao: string | null;
                id: string;
                nome: string;
                empresaId: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            quantidade: number;
            produtoId: string;
            depositoId: string;
        })[];
    } & {
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
    }>;
    update(id: string, data: Prisma.ProdutoUpdateInput, req: any): Promise<{
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
    }>;
    remove(id: string, req: any): Promise<{
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
    }>;
}
