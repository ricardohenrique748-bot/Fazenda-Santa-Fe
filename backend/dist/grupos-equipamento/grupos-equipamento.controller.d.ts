import { GruposEquipamentoService } from './grupos-equipamento.service';
import { Prisma } from '@prisma/client';
export declare class GruposEquipamentoController {
    private readonly gruposEquipamentoService;
    constructor(gruposEquipamentoService: GruposEquipamentoService);
    create(req: any, data: Prisma.GrupoEquipamentoCreateInput): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }>;
    findAll(req: any): Promise<({
        _count: {
            veiculos: number;
        };
    } & {
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    })[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    } | null>;
    update(req: any, id: string, data: Prisma.GrupoEquipamentoUpdateInput): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }>;
}
