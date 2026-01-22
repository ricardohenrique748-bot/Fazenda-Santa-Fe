import { PrismaService } from '../prisma/prisma.service';
import { Apontamento, Prisma } from '@prisma/client';
export declare class ApontamentosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(empresaId: string, data: Prisma.ApontamentoCreateInput): Promise<Apontamento>;
    findAll(empresaId: string): Promise<({
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
    findOne(empresaId: string, id: string): Promise<Apontamento | null>;
    update(empresaId: string, id: string, data: Prisma.ApontamentoUpdateInput): Promise<Apontamento>;
    remove(empresaId: string, id: string): Promise<Apontamento>;
}
