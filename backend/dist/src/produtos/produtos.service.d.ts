import { PrismaService } from '../prisma/prisma.service';
import { Produto, Prisma } from '@prisma/client';
export declare class ProdutosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProdutoCreateInput): Promise<Produto>;
    findAll(empresaId: string): Promise<({
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
    findOne(id: string, empresaId: string): Promise<{
        movimentacoes: ({
            usuario: {
                nome: string;
            };
            deposito: {
                id: string;
                nome: string;
                empresaId: string;
                createdAt: Date;
                updatedAt: Date;
                localizacao: string | null;
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
        })[];
        estoques: ({
            deposito: {
                id: string;
                nome: string;
                empresaId: string;
                createdAt: Date;
                updatedAt: Date;
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
    update(id: string, data: Prisma.ProdutoUpdateInput, empresaId: string): Promise<Produto>;
    remove(id: string, empresaId: string): Promise<Produto>;
}
