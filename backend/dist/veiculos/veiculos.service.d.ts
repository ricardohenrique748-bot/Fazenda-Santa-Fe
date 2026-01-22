import { PrismaService } from '../prisma/prisma.service';
import { Veiculo, Prisma } from '@prisma/client';
export declare class VeiculosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(empresaId: string, data: Prisma.VeiculoCreateInput): Promise<Veiculo>;
    findAll(empresaId: string): Promise<({
        grupo: {
            nome: string;
        } | null;
    } & {
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
    })[]>;
    findOne(empresaId: string, id: string): Promise<({
        manutencoes: {
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
        }[];
        grupo: {
            id: string;
            nome: string;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            descricao: string | null;
        } | null;
    } & {
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
    }) | null>;
    update(empresaId: string, id: string, data: Prisma.VeiculoUpdateInput): Promise<Veiculo>;
    remove(empresaId: string, id: string): Promise<Veiculo>;
}
