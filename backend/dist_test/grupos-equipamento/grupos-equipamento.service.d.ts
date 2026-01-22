import { PrismaService } from '../prisma/prisma.service';
import { GrupoEquipamento, Prisma } from '@prisma/client';
export declare class GruposEquipamentoService {
    private prisma;
    constructor(prisma: PrismaService);
    create(empresaId: string, data: Prisma.GrupoEquipamentoCreateInput): Promise<GrupoEquipamento>;
    findAll(empresaId: string): Promise<({
        _count: {
            veiculos: number;
        };
    } & {
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    })[]>;
    findOne(empresaId: string, id: string): Promise<GrupoEquipamento | null>;
    update(empresaId: string, id: string, data: Prisma.GrupoEquipamentoUpdateInput): Promise<GrupoEquipamento>;
    remove(empresaId: string, id: string): Promise<GrupoEquipamento>;
}
