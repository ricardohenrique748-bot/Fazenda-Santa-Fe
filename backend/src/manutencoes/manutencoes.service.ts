import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Manutencao, Prisma } from '@prisma/client';

@Injectable()
export class ManutencoesService {
  constructor(private prisma: PrismaService) { }

  async create(
    data: Prisma.ManutencaoCreateInput,
    empresaId?: string,
  ): Promise<Manutencao> {
    // Ao criar manutenção, opcionalmente atualizar horímetro/odômetro do veículo
    const { veiculo: _veiculo, ...cleanData } = data as any;

    // Validar se o veículo pertence à empresa (se filtrado)
    if (empresaId) {
      const veiculoExists = await this.prisma.veiculo.findFirst({
        where: { id: data.veiculo.connect?.id, empresaId },
      });
      if (!veiculoExists)
        throw new Error('Caminhão/Máquina não encontrada para esta empresa.');
    }

    const manutencao = await this.prisma.manutencao.create({
      data: {
        ...cleanData,
        veiculo: { connect: { id: data.veiculo.connect?.id } },
      },
    });

    // Buscar veículo para atualizar contadores se informado no ato
    if (data.horimetroNoAto || data.odometroNoAto) {
      const updateData: any = {};
      if (data.horimetroNoAto) updateData.horimetroAtual = data.horimetroNoAto;
      if (data.odometroNoAto) updateData.odometroAtual = data.odometroNoAto;

      await this.prisma.veiculo.update({
        where: { id: data.veiculo.connect?.id },
        data: updateData,
      });
    }

    return manutencao;
  }

  async findAll(empresaId?: string) {
    return this.prisma.manutencao.findMany({
      where: empresaId
        ? {
          veiculo: { empresaId },
        }
        : {},
      include: {
        veiculo: { select: { nome: true, placa: true, numeroFrota: true } },
      },
      orderBy: { data: 'desc' },
    });
  }

  async findOne(id: string, empresaId?: string) {
    return this.prisma.manutencao.findFirst({
      where: {
        id,
        ...(empresaId
          ? {
            veiculo: { empresaId },
          }
          : {}),
      },
      include: { veiculo: true },
    });
  }

  async update(
    id: string,
    data: Prisma.ManutencaoUpdateInput,
    empresaId?: string,
  ): Promise<Manutencao> {
    const existing = await this.findOne(id, empresaId);
    if (!existing) throw new Error('Manutenção não encontrada.');

    const { veiculo: _veiculo, ...cleanData } = data as any;

    return this.prisma.manutencao.update({
      where: { id },
      data: cleanData,
    });
  }

  async remove(id: string, empresaId?: string): Promise<Manutencao> {
    const existing = await this.findOne(id, empresaId);
    if (!existing) throw new Error('Manutenção não encontrada.');

    return this.prisma.manutencao.delete({
      where: { id },
    });
  }
}
