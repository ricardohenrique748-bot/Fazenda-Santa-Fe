import { VeiculosService } from './veiculos.service';
import { Prisma } from '@prisma/client';
export declare class VeiculosController {
    private readonly veiculosService;
    constructor(veiculosService: VeiculosService);
    create(req: any, data: Prisma.VeiculoCreateInput): Promise<{
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
    }>;
    findAll(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<({
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
    update(req: any, id: string, data: Prisma.VeiculoUpdateInput): Promise<{
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
    }>;
    remove(req: any, id: string): Promise<{
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
    }>;
}
