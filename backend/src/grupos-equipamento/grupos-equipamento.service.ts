import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GrupoEquipamento, Prisma } from '@prisma/client';

@Injectable()
export class GruposEquipamentoService {
    constructor(private prisma: PrismaService) { }

    async create(empresaId: string, data: Prisma.GrupoEquipamentoCreateInput): Promise<GrupoEquipamento> {
        return this.prisma.grupoEquipamento.create({
            data: {
                ...data,
                empresa: { connect: { id: empresaId } }
            }
        });
    }

    async findAll(empresaId: string) {
        return this.prisma.grupoEquipamento.findMany({
            where: { empresaId },
            include: {
                _count: {
                    select: { veiculos: true }
                }
            },
            orderBy: { nome: 'asc' }
        });
    }

    async findOne(empresaId: string, id: string): Promise<GrupoEquipamento | null> {
        return this.prisma.grupoEquipamento.findFirst({
            where: { id, empresaId },
            include: {
                veiculos: {
                    select: { nome: true, placa: true, status: true }
                }
            }
        });
    }

    async update(empresaId: string, id: string, data: Prisma.GrupoEquipamentoUpdateInput): Promise<GrupoEquipamento> {
        const existing = await this.findOne(empresaId, id);
        if (!existing) throw new BadRequestException('Grupo de equipamento não encontrado.');

        // Clean up relations from data to avoid prisma update conflicts
        const { empresa, veiculos, ...cleanData } = data as any;

        return this.prisma.grupoEquipamento.update({
            where: { id },
            data: cleanData,
        });
    }

    async remove(empresaId: string, id: string): Promise<GrupoEquipamento> {
        const existing = await this.findOne(empresaId, id);
        if (!existing) throw new BadRequestException('Grupo de equipamento não encontrado.');

        // Verify if there are vehicles associated
        const count = await this.prisma.veiculo.count({ where: { grupoId: id } });
        if (count > 0) {
            throw new BadRequestException('Não é possível excluir um grupo que possui equipamentos vinculados.');
        }

        return this.prisma.grupoEquipamento.delete({
            where: { id },
        });
    }
}
