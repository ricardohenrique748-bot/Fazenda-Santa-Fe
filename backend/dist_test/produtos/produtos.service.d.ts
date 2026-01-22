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
    findOne(id: string, empresaId: string): Promise<{
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
    update(id: string, data: Prisma.ProdutoUpdateInput, empresaId: string): Promise<Produto>;
    remove(id: string, empresaId: string): Promise<Produto>;
}
