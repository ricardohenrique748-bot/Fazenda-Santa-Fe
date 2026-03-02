import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Veiculo, Prisma } from '@prisma/client';

@Injectable()
export class VeiculosService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.VeiculoCreateInput,
    empresaId?: string,
  ): Promise<Veiculo> {
    // CLEANUP: Remove relational fields to avoid Prisma errors
    const {
      empresa: _empresa,
      grupo: _grupo,
      manutencoes: _manutencoes,
      ...cleanData
    } = data as any;

    // Verificar se placa ou número de frota já existem
    if (cleanData.placa) {
      const existingPlaca = await this.prisma.veiculo.findFirst({
        where: { placa: cleanData.placa, ...(empresaId ? { empresaId } : {}) },
      });
      if (existingPlaca) throw new BadRequestException('Placa já cadastrada');
    }
    if (cleanData.numeroFrota) {
      const existingFrota = await this.prisma.veiculo.findFirst({
        where: {
          numeroFrota: cleanData.numeroFrota,
          ...(empresaId ? { empresaId } : {}),
        },
      });
      if (existingFrota)
        throw new BadRequestException('Número de frota já cadastrado');
    }

    return this.prisma.veiculo.create({
      data: {
        ...cleanData,
        ...(empresaId ? { empresa: { connect: { id: empresaId } } } : {}),
      },
    });
  }

  async findAll(empresaId?: string) {
    return this.prisma.veiculo.findMany({
      where: empresaId ? { empresaId } : {},
      include: {
        grupo: { select: { nome: true } },
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string, empresaId?: string) {
    return this.prisma.veiculo.findFirst({
      where: { id, ...(empresaId ? { empresaId } : {}) },
      include: {
        grupo: true,
        manutencoes: {
          orderBy: { data: 'desc' },
          take: 10,
        },
      },
    });
  }

  async update(
    id: string,
    data: Prisma.VeiculoUpdateInput,
    empresaId?: string,
  ): Promise<Veiculo> {
    const existing = await this.findOne(id, empresaId);
    if (!existing) throw new BadRequestException('Veículo não encontrado.');

    const {
      empresa: _empresa,
      grupo: _grupo,
      manutencoes: _manutencoes,
      ...cleanData
    } = data as any;

    return this.prisma.veiculo.update({
      where: { id },
      data: cleanData,
    });
  }

  async remove(id: string, empresaId?: string): Promise<Veiculo> {
    const existing = await this.findOne(id, empresaId);
    if (!existing) throw new BadRequestException('Veículo não encontrado.');

    return this.prisma.veiculo.delete({
      where: { id },
    });
  }
}
