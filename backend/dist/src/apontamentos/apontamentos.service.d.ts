import { PrismaService } from '../prisma/prisma.service';
import { Apontamento, Prisma } from '@prisma/client';
export declare class ApontamentosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(empresaId: string, data: Prisma.ApontamentoCreateInput): Promise<Apontamento>;
    findAll(empresaId: string): Promise<({
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
    findOne(empresaId: string, id: string): Promise<Apontamento | null>;
    update(empresaId: string, id: string, data: Prisma.ApontamentoUpdateInput): Promise<Apontamento>;
    remove(empresaId: string, id: string): Promise<Apontamento>;
}
