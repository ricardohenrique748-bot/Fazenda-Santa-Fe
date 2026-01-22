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
    getSaldos(empresaId: string): Promise<({
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
    transferirProduto(data: any): Promise<any>;
    processarConferencia(data: any): Promise<any>;
}
