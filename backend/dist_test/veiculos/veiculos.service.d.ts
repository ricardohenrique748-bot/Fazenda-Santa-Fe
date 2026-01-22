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
    })[]>;
    findOne(empresaId: string, id: string): Promise<({
        grupo: {
            id: string;
            descricao: string | null;
            createdAt: Date;
            updatedAt: Date;
            nome: string;
            empresaId: string;
        } | null;
        manutencoes: {
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
        }[];
    } & {
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
    }) | null>;
    update(empresaId: string, id: string, data: Prisma.VeiculoUpdateInput): Promise<Veiculo>;
    remove(empresaId: string, id: string): Promise<Veiculo>;
}
