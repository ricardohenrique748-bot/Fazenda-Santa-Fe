import { PrismaService } from '../prisma/prisma.service';
import { Manutencao, Prisma } from '@prisma/client';
export declare class ManutencoesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(empresaId: string, data: Prisma.ManutencaoCreateInput): Promise<Manutencao>;
    findAll(empresaId: string): Promise<({
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
    findOne(empresaId: string, id: string): Promise<({
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
    update(empresaId: string, id: string, data: Prisma.ManutencaoUpdateInput): Promise<Manutencao>;
    remove(empresaId: string, id: string): Promise<Manutencao>;
}
