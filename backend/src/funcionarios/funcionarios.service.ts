import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Funcionario, Prisma } from '@prisma/client';

@Injectable()
export class FuncionariosService {
    constructor(private prisma: PrismaService) { }

    async create(empresaId: string, data: Prisma.FuncionarioCreateInput): Promise<Funcionario> {
        const existing = await this.prisma.funcionario.findFirst({
            where: {
                cpf: data.cpf,
                empresaId: empresaId
            }
        });
        if (existing) {
            throw new BadRequestException('CPF já cadastrado nesta empresa.');
        }

        // Se o data já vier com empresaId, garantir que seja o correto
        // Mas o Prisma.FuncionarioCreateInput geralmente espera um connect ou create se for relacional
        // Como o controller passa o objeto direto, vamos garantir o empresaId
        const { empresa, apontamentos, entregasEPI, exames, ...cleanData } = data as any;
        return this.prisma.funcionario.create({
            data: {
                ...cleanData,
                empresa: { connect: { id: empresaId } }
            }
        });
    }

    async findAll(empresaId: string) {
        return this.prisma.funcionario.findMany({
            where: { empresaId },
            include: {
                empresa: {
                    select: { razaoSocial: true }
                }
            },
            orderBy: { nome: 'asc' }
        });
    }

    async findOne(empresaId: string, id: string): Promise<Funcionario | null> {
        return this.prisma.funcionario.findFirst({
            where: { id, empresaId },
            include: { empresa: true }
        });
    }

    async update(empresaId: string, id: string, data: Prisma.FuncionarioUpdateInput): Promise<Funcionario> {
        // Garantir que pertence à empresa antes de atualizar
        const existing = await this.findOne(empresaId, id);
        if (!existing) throw new BadRequestException('Funcionário não encontrado.');

        const { empresa, apontamentos, entregasEPI, exames, empresaId: _unused, ...cleanData } = data as any;
        return this.prisma.funcionario.update({
            where: { id },
            data: cleanData,
        });
    }

    async remove(empresaId: string, id: string): Promise<Funcionario> {
        // Garantir que pertence à empresa antes de remover
        const existing = await this.findOne(empresaId, id);
        if (!existing) throw new BadRequestException('Funcionário não encontrado.');

        return this.prisma.funcionario.delete({
            where: { id },
        });
    }
}
