import { ManutencoesService } from './manutencoes.service';
import { Prisma } from '@prisma/client';
export declare class ManutencoesController {
    private readonly manutencoesService;
    constructor(manutencoesService: ManutencoesService);
    create(req: any, data: Prisma.ManutencaoCreateInput): Promise<{
        id: string;
        data: Date;
        descricao: string;
        tipo: string;
        createdAt: Date;
        updatedAt: Date;
        veiculoId: string;
        horimetroNoAto: number | null;
        odometroNoAto: number | null;
        custoTotal: number;
    }>;
    findAll(req: any): Promise<({
        veiculo: {
            nome: string;
            placa: string | null;
            numeroFrota: string | null;
        };
    } & {
        id: string;
        data: Date;
        descricao: string;
        tipo: string;
        createdAt: Date;
        updatedAt: Date;
        veiculoId: string;
        horimetroNoAto: number | null;
        odometroNoAto: number | null;
        custoTotal: number;
    })[]>;
    findOne(req: any, id: string): Promise<({
        veiculo: {
            id: string;
            tipo: import(".prisma/client").$Enums.TipoVeiculo;
            createdAt: Date;
            updatedAt: Date;
            nome: string;
            empresaId: string;
            status: import(".prisma/client").$Enums.StatusVeiculo;
            grupoId: string | null;
            placa: string | null;
            numeroFrota: string | null;
            marca: string | null;
            modelo: string | null;
            ano: number | null;
            horimetroAtual: number;
            odometroAtual: number;
        };
    } & {
        id: string;
        data: Date;
        descricao: string;
        tipo: string;
        createdAt: Date;
        updatedAt: Date;
        veiculoId: string;
        horimetroNoAto: number | null;
        odometroNoAto: number | null;
        custoTotal: number;
    }) | null>;
    update(req: any, id: string, data: Prisma.ManutencaoUpdateInput): Promise<{
        id: string;
        data: Date;
        descricao: string;
        tipo: string;
        createdAt: Date;
        updatedAt: Date;
        veiculoId: string;
        horimetroNoAto: number | null;
        odometroNoAto: number | null;
        custoTotal: number;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        data: Date;
        descricao: string;
        tipo: string;
        createdAt: Date;
        updatedAt: Date;
        veiculoId: string;
        horimetroNoAto: number | null;
        odometroNoAto: number | null;
        custoTotal: number;
    }>;
}
