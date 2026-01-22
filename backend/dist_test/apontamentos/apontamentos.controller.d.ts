import { ApontamentosService } from './apontamentos.service';
import { Prisma } from '@prisma/client';
export declare class ApontamentosController {
    private readonly apontamentosService;
    constructor(apontamentosService: ApontamentosService);
    create(req: any, data: Prisma.ApontamentoCreateInput): Promise<{
        id: string;
        data: Date;
        quantidade: number;
        descricao: string | null;
        tipo: import(".prisma/client").$Enums.TipoApontamento;
        funcionarioId: string;
        fazendaId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(req: any): Promise<({
        fazenda: {
            nome: string;
        } | null;
        funcionario: {
            nome: string;
        };
    } & {
        id: string;
        data: Date;
        quantidade: number;
        descricao: string | null;
        tipo: import(".prisma/client").$Enums.TipoApontamento;
        funcionarioId: string;
        fazendaId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        data: Date;
        quantidade: number;
        descricao: string | null;
        tipo: import(".prisma/client").$Enums.TipoApontamento;
        funcionarioId: string;
        fazendaId: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(req: any, id: string, data: Prisma.ApontamentoUpdateInput): Promise<{
        id: string;
        data: Date;
        quantidade: number;
        descricao: string | null;
        tipo: import(".prisma/client").$Enums.TipoApontamento;
        funcionarioId: string;
        fazendaId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        data: Date;
        quantidade: number;
        descricao: string | null;
        tipo: import(".prisma/client").$Enums.TipoApontamento;
        funcionarioId: string;
        fazendaId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
