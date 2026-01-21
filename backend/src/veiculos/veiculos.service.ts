import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Veiculo, Prisma } from '@prisma/client';

@Injectable()
export class VeiculosService {
    constructor(private prisma: PrismaService) { }

    async create(empresaId: string, data: Prisma.VeiculoCreateInput): Promise<Veiculo> {
        // CLEANUP: Remove relational fields to avoid Prisma errors
        const { empresa, grupo, manutencoes, ...cleanData } = data as any;

        // Verificar se placa ou número de frota já existem NA MESMA EMPRESA
        if (cleanData.placa) {
            const existingPlaca = await this.prisma.veiculo.findFirst({
                where: { placa: cleanData.placa, empresaId }
            });
            if (existingPlaca) throw new BadRequestException('Placa já cadastrada nesta empresa');
        }
        if (cleanData.numeroFrota) {
            const existingFrota = await this.prisma.veiculo.findFirst({
                where: { numeroFrota: cleanData.numeroFrota, empresaId }
            });
            if (existingFrota) throw new BadRequestException('Número de frota já cadastrado nesta empresa');
        }

        return this.prisma.veiculo.create({
            data: {
                ...cleanData,
                empresa: { connect: { id: empresaId } }
            }
        });
    }

    async findAll(empresaId: string) {
        return this.prisma.veiculo.findMany({
            where: { empresaId },
            include: {
                grupo: { select: { nome: true } }
            },
            orderBy: { nome: 'asc' }
        });
    }

    async findOne(empresaId: string, id: string) {
        return this.prisma.veiculo.findFirst({
            where: { id, empresaId },
            include: {
                grupo: true,
                manutencoes: {
                    orderBy: { data: 'desc' },
                    take: 10
                }
            }
        });
    }

    async update(empresaId: string, id: string, data: Prisma.VeiculoUpdateInput): Promise<Veiculo> {
        const existing = await this.findOne(empresaId, id);
        if (!existing) throw new BadRequestException('Veículo não encontrado.');

        const { empresa, grupo, manutencoes, ...cleanData } = data as any;

        return this.prisma.veiculo.update({
            where: { id },
            data: cleanData,
        });
    }

    async remove(empresaId: string, id: string): Promise<Veiculo> {
        const existing = await this.findOne(empresaId, id);
        if (!existing) throw new BadRequestException('Veículo não encontrado.');

        return this.prisma.veiculo.delete({
            where: { id },
        });
    }
}
