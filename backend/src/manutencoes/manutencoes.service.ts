import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Manutencao, Prisma } from '@prisma/client';

@Injectable()
export class ManutencoesService {
    constructor(private prisma: PrismaService) { }

    async create(empresaId: string, data: Prisma.ManutencaoCreateInput): Promise<Manutencao> {
        // Ao criar manutenção, opcionalmente atualizar horímetro/odômetro do veículo
        const { veiculo, ...cleanData } = data as any;

        // Validar se o veículo pertence à empresa
        const veiculoExists = await this.prisma.veiculo.findFirst({
            where: { id: data.veiculo.connect?.id, empresaId }
        });
        if (!veiculoExists) throw new Error('Caminhão/Máquina não encontrada para esta empresa.');

        const manutencao = await this.prisma.manutencao.create({
            data: {
                ...cleanData,
                veiculo: { connect: { id: data.veiculo.connect?.id } }
            }
        });

        // Buscar veículo para atualizar contadores se informado no ato
        if (data.horimetroNoAto || data.odometroNoAto) {
            const updateData: any = {};
            if (data.horimetroNoAto) updateData.horimetroAtual = data.horimetroNoAto;
            if (data.odometroNoAto) updateData.odometroAtual = data.odometroNoAto;

            await this.prisma.veiculo.update({
                where: { id: data.veiculo.connect?.id },
                data: updateData
            });
        }

        return manutencao;
    }

    async findAll(empresaId: string) {
        return this.prisma.manutencao.findMany({
            where: {
                veiculo: { empresaId }
            },
            include: {
                veiculo: { select: { nome: true, placa: true, numeroFrota: true } }
            },
            orderBy: { data: 'desc' }
        });
    }

    async findOne(empresaId: string, id: string) {
        return this.prisma.manutencao.findFirst({
            where: {
                id,
                veiculo: { empresaId }
            },
            include: { veiculo: true }
        });
    }

    async update(empresaId: string, id: string, data: Prisma.ManutencaoUpdateInput): Promise<Manutencao> {
        const existing = await this.findOne(empresaId, id);
        if (!existing) throw new Error('Manutenção não encontrada.');

        const { veiculo, ...cleanData } = data as any;

        return this.prisma.manutencao.update({
            where: { id },
            data: cleanData,
        });
    }

    async remove(empresaId: string, id: string): Promise<Manutencao> {
        const existing = await this.findOne(empresaId, id);
        if (!existing) throw new Error('Manutenção não encontrada.');

        return this.prisma.manutencao.delete({
            where: { id },
        });
    }
}
