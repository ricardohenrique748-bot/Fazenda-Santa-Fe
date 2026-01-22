import { GruposEquipamentoService } from './grupos-equipamento.service';
import { Prisma } from '@prisma/client';
export declare class GruposEquipamentoController {
    private readonly gruposEquipamentoService;
    constructor(gruposEquipamentoService: GruposEquipamentoService);
    create(req: any, data: Prisma.GrupoEquipamentoCreateInput): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    findAll(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    } | null>;
    update(req: any, id: string, data: Prisma.GrupoEquipamentoUpdateInput): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
}
