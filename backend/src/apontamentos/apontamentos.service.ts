import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Apontamento, Prisma } from '@prisma/client';

@Injectable()
export class ApontamentosService {
  constructor(private prisma: PrismaService) { }

  async create(
    empresaId: string,
    data: Prisma.ApontamentoCreateInput,
  ): Promise<Apontamento> {
    // O data aqui via controller pode ser um pouco diferente dependendo de como o DTO está
    // Mas assumindo que data.funcionario.connect existe ou data.funcionarioId
    // Vamos apenas garantir que o funcionário pertence à empresa

    const funcionarioId =
      (data as any).funcionario?.connect?.id || (data as any).funcionarioId;

    if (funcionarioId && empresaId) {
      const func = await this.prisma.funcionario.findFirst({
        where: { id: funcionarioId, empresaId },
      });
      if (!func) throw new Error('Funcionário não pertence a esta empresa.');
    }

    return this.prisma.apontamento.create({ data });
  }

  async findAll(empresaId?: string) {
    return this.prisma.apontamento.findMany({
      where: empresaId
        ? {
          funcionario: {
            empresaId: empresaId,
          },
        }
        : {},
      include: {
        funcionario: { select: { nome: true } },
        fazenda: { select: { nome: true } },
      },
      orderBy: { data: 'desc' },
    });
  }

  async findOne(id: string, empresaId?: string): Promise<Apontamento | null> {
    return this.prisma.apontamento.findFirst({
      where: {
        id,
        ...(empresaId
          ? {
            funcionario: {
              empresaId: empresaId,
            },
          }
          : {}),
      },
      include: {
        funcionario: true,
        fazenda: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.ApontamentoUpdateInput,
    empresaId?: string,
  ): Promise<Apontamento> {
    const existing = await this.findOne(id, empresaId);
    if (!existing)
      throw new Error('Apontamento não encontrado ou acesso negado.');

    const { funcionario, fazenda, ...cleanData } = data as any;
    return this.prisma.apontamento.update({
      where: { id },
      data: cleanData,
    });
  }

  async remove(id: string, empresaId?: string): Promise<Apontamento> {
    const existing = await this.findOne(id, empresaId);
    if (!existing)
      throw new Error('Apontamento não encontrado ou acesso negado.');

    return this.prisma.apontamento.delete({
      where: { id },
    });
  }
}
