import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Funcionario, Prisma } from '@prisma/client';

@Injectable()
export class FuncionariosService {
  constructor(private prisma: PrismaService) {}

  async create(empresaId: string, data: any): Promise<Funcionario> {
    try {
      // Limpar campos que não pertencem ao modelo
      const cleanData: any = {};
      const allowedFields = [
        'nome',
        'cpf',
        'email',
        'telefone',
        'cargo',
        'dataAdmissao',
        'salario',
        'ativo',
      ];
      for (const field of allowedFields) {
        if (data[field] !== undefined) {
          cleanData[field] = data[field];
        }
      }

      // empresaId: prioridade para o do token, fallback para o do body
      const finalEmpresaId = empresaId || data.empresaId;
      console.log(
        'FuncionariosService.create - empresaId do token:',
        empresaId,
        '| finalEmpresaId:',
        finalEmpresaId,
        '| cpf:',
        cleanData.cpf,
      );

      if (!finalEmpresaId) {
        throw new BadRequestException(
          'Empresa não informada. Faça logout e login novamente.',
        );
      }

      // Converter strings vazias para null
      for (const key of Object.keys(cleanData)) {
        if (
          typeof cleanData[key] === 'string' &&
          cleanData[key].trim() === ''
        ) {
          cleanData[key] = null;
        }
      }

      // Converter data de admissão
      if (cleanData.dataAdmissao) {
        cleanData.dataAdmissao = new Date(cleanData.dataAdmissao);
      }

      // Converter salário para número
      if (cleanData.salario !== undefined && cleanData.salario !== null) {
        cleanData.salario = Number(cleanData.salario);
      }

      // Verificar CPF duplicado
      if (cleanData.cpf) {
        const existing = await this.prisma.funcionario.findFirst({
          where: { cpf: cleanData.cpf },
        });
        if (existing) {
          throw new BadRequestException(
            'CPF já cadastrado para outro funcionário.',
          );
        }
      }

      return this.prisma.funcionario.create({
        data: {
          ...cleanData,
          empresa: { connect: { id: finalEmpresaId } },
        },
      });
    } catch (error: any) {
      console.error(
        'ERRO AO CRIAR FUNCIONARIO:',
        error?.message || JSON.stringify(error),
      );
      throw error;
    }
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
        dataAdmissao: cleanData.dataAdmissao
          ? new Date(cleanData.dataAdmissao)
          : undefined,
        ...(_frontendEmpresaId
          ? { empresa: { connect: { id: _frontendEmpresaId } } }
          : {}),
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
