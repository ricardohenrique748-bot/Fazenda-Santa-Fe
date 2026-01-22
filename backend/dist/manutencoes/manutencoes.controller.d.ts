import { ManutencoesService } from './manutencoes.service';
import { Prisma } from '@prisma/client';
export declare class ManutencoesController {
    private readonly manutencoesService;
    constructor(manutencoesService: ManutencoesService);
    create(req: any, data: Prisma.ManutencaoCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: Date;
        descricao: string;
        tipo: string;
        horimetroNoAto: number | null;
        odometroNoAto: number | null;
        custoTotal: number;
        veiculoId: string;
    }>;
    findAll(req: any): Promise<({
        veiculo: {
            nome: string;
            placa: string | null;
            numeroFrota: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: Date;
        descricao: string;
        tipo: string;
        horimetroNoAto: number | null;
        odometroNoAto: number | null;
        custoTotal: number;
        veiculoId: string;
    })[]>;
    findOne(req: any, id: string): Promise<({
        veiculo: {
            id: string;
            nome: string;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.StatusVeiculo;
            tipo: import("@prisma/client").$Enums.TipoVeiculo;
            placa: string | null;
            numeroFrota: string | null;
            marca: string | null;
            modelo: string | null;
            ano: number | null;
            horimetroAtual: number;
            odometroAtual: number;
            grupoId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: Date;
        descricao: string;
        tipo: string;
        horimetroNoAto: number | null;
        odometroNoAto: number | null;
        custoTotal: number;
        veiculoId: string;
    }) | null>;
    update(req: any, id: string, data: Prisma.ManutencaoUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: Date;
        descricao: string;
        tipo: string;
        horimetroNoAto: number | null;
        odometroNoAto: number | null;
        custoTotal: number;
        veiculoId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: Date;
        descricao: string;
        tipo: string;
        horimetroNoAto: number | null;
        odometroNoAto: number | null;
        custoTotal: number;
        veiculoId: string;
    }>;
}
