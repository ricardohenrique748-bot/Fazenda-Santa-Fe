import { PrismaService } from '../prisma/prisma.service';
import { EstoqueMovimentacao } from '@prisma/client';
export declare class EstoqueService {
    private prisma;
    constructor(prisma: PrismaService);
    createMovimentacao(data: any): Promise<EstoqueMovimentacao>;
    findAllMovimentacoes(empresaId: string): Promise<({
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
        motivo: string | null;
        produtoId: string;
        depositoId: string;
        usuarioId: string;
    })[]>;
    getSaldos(empresaId: string): Promise<({
        deposito: {
            localizacao: string | null;
            id: string;
            nome: string;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
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
    transferirProduto(data: any): Promise<any>;
    processarConferencia(data: any): Promise<any>;
}
