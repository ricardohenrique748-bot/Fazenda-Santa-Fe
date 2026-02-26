import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Funcionario, Prisma } from '@prisma/client';

@Injectable()
export class FuncionariosService {
  constructor(private prisma: PrismaService) { }

  async create(
    empresaId: string,
    data: Prisma.FuncionarioCreateInput,
  ): Promise<Funcionario> {
    const {
      empresa: _empresa,
      apontamentos: _apontamentos,
      entregasEPI: _entregasEPI,
      exames: _exames,
      empresaId: _frontendEmpresaId,
      dataAdmissao,
      ...cleanData
    } = data as any;

    const finalEmpresaId = empresaId || _frontendEmpresaId;

    const existing = await this.prisma.funcionario.findFirst({
      where: {
        cpf: data.cpf,
        ...(finalEmpresaId ? { empresaId: finalEmpresaId } : {}),
      },
    });
    if (existing) {
      throw new BadRequestException('CPF já cadastrado.');
    }

    if (!finalEmpresaId) {
      throw new BadRequestException('Empresa não informada.');
    }

    return this.prisma.funcionario.create({
      data: {
        ...cleanData,
        dataAdmissao: dataAdmissao ? new Date(dataAdmissao) : undefined,
        empresa: { connect: { id: finalEmpresaId } },
      },
    });
  }

  async findAll(empresaId?: string) {
    return this.prisma.funcionario.findMany({
      where: empresaId ? { empresaId } : {},
      include: {
        empresa: {
          select: { razaoSocial: true },
        },
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string, empresaId?: string): Promise<Funcionario | null> {
    return this.prisma.funcionario.findFirst({
      where: { id, ...(empresaId ? { empresaId } : {}) },
      include: { empresa: true },
    });
  }

  async update(
    id: string,
    data: Prisma.FuncionarioUpdateInput,
    empresaId?: string,
  ): Promise<Funcionario> {
    // Garantir que pertence à empresa antes de atualizar (se filtrado)
    const existing = await this.findOne(id, empresaId);
    if (!existing) throw new BadRequestException('Funcionário não encontrado.');

    const {
      empresa: _empresa,
      apontamentos: _apontamentos,
      entregasEPI: _entregasEPI,
      exames: _exames,
      empresaId: _frontendEmpresaId,
      ...cleanData
    } = data as any;

    return this.prisma.funcionario.update({
      where: { id },
      data: {
        ...cleanData,
        dataAdmissao: cleanData.dataAdmissao ? new Date(cleanData.dataAdmissao) : undefined,
        ...(_frontendEmpresaId ? { empresa: { connect: { id: _frontendEmpresaId } } } : {}),
      },
    });
  }

  async remove(id: string, empresaId?: string): Promise<Funcionario> {
    // Garantir que pertence à empresa antes de remover (se filtrado)
    const existing = await this.findOne(id, empresaId);
    if (!existing) throw new BadRequestException('Funcionário não encontrado.');

    return this.prisma.funcionario.delete({
      where: { id },
    });
  }
}
