import { ApontamentosService } from './apontamentos.service';
import { Prisma } from '@prisma/client';
export declare class ApontamentosController {
    private readonly apontamentosService;
    constructor(apontamentosService: ApontamentosService);
    create(req: any, data: Prisma.ApontamentoCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: Date;
        descricao: string | null;
        tipo: import("@prisma/client").$Enums.TipoApontamento;
        quantidade: number;
        funcionarioId: string;
        fazendaId: string | null;
    }>;
    findAll(req: any): Promise<({
        funcionario: {
            nome: string;
        };
        fazenda: {
            nome: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: Date;
        descricao: string | null;
        tipo: import("@prisma/client").$Enums.TipoApontamento;
        quantidade: number;
        funcionarioId: string;
        fazendaId: string | null;
    })[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: Date;
        descricao: string | null;
        tipo: import("@prisma/client").$Enums.TipoApontamento;
        quantidade: number;
        funcionarioId: string;
        fazendaId: string | null;
    } | null>;
    update(req: any, id: string, data: Prisma.ApontamentoUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: Date;
        descricao: string | null;
        tipo: import("@prisma/client").$Enums.TipoApontamento;
        quantidade: number;
        funcionarioId: string;
        fazendaId: string | null;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: Date;
        descricao: string | null;
        tipo: import("@prisma/client").$Enums.TipoApontamento;
        quantidade: number;
        funcionarioId: string;
        fazendaId: string | null;
    }>;
}
