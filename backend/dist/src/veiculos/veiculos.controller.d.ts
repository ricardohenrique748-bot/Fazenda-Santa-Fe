import { VeiculosService } from './veiculos.service';
import { Prisma } from '@prisma/client';
export declare class VeiculosController {
    private readonly veiculosService;
    constructor(veiculosService: VeiculosService);
    create(req: any, data: Prisma.VeiculoCreateInput): Promise<{
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
    }>;
    findAll(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<({
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
    update(req: any, id: string, data: Prisma.VeiculoUpdateInput): Promise<{
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
    }>;
    remove(req: any, id: string): Promise<{
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
    }>;
}
