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
    findOne(empresaId: string, id: string): Promise<({
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
    update(empresaId: string, id: string, data: Prisma.ManutencaoUpdateInput): Promise<Manutencao>;
    remove(empresaId: string, id: string): Promise<Manutencao>;
}
