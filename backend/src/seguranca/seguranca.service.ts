import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EPI, EntregaEPI, ExameOcupacional } from '@prisma/client';

@Injectable()
export class SegurancaService {
    constructor(private prisma: PrismaService) { }

    // EPIs
    async createEPI(data: any): Promise<EPI> {
        return this.prisma.ePI.create({ data });
    }

    async getEPIs(): Promise<EPI[]> {
        return this.prisma.ePI.findMany({
            orderBy: { nome: 'asc' },
        });
    }

    async getEPIById(id: string): Promise<EPI | null> {
        return this.prisma.ePI.findUnique({ where: { id } });
    }

    async updateEPI(id: string, data: any): Promise<EPI> {
        return this.prisma.ePI.update({ where: { id }, data });
    }

    async deleteEPI(id: string): Promise<void> {
        await this.prisma.ePI.delete({ where: { id } });
    }

    // Entregas
    async createEntrega(data: any): Promise<EntregaEPI> {
        return this.prisma.entregaEPI.create({
            data: {
                ...data,
                dataEntrega: new Date(data.dataEntrega),
            },
        });
    }

    async getEntregas(funcionarioId?: string): Promise<EntregaEPI[]> {
        return this.prisma.entregaEPI.findMany({
            where: funcionarioId ? { funcionarioId } : {},
            include: {
                funcionario: true,
                epi: true,
            },
            orderBy: { dataEntrega: 'desc' },
        });
    }

    // Exames
    async createExame(data: any): Promise<ExameOcupacional> {
        return this.prisma.exameOcupacional.create({
            data: {
                ...data,
                dataRealizacao: new Date(data.dataRealizacao),
                dataVencimento: new Date(data.dataVencimento),
            },
        });
    }

    async getExames(funcionarioId?: string): Promise<ExameOcupacional[]> {
        return this.prisma.exameOcupacional.findMany({
            where: funcionarioId ? { funcionarioId } : {},
            include: {
                funcionario: true,
            },
            orderBy: { dataVencimento: 'asc' },
        });
    }

    async getExameById(id: string): Promise<ExameOcupacional | null> {
        return this.prisma.exameOcupacional.findUnique({ where: { id } });
    }

    async updateExame(id: string, data: any): Promise<ExameOcupacional> {
        return this.prisma.exameOcupacional.update({
            where: { id },
            data: {
                ...data,
                dataRealizacao: data.dataRealizacao ? new Date(data.dataRealizacao) : undefined,
                dataVencimento: data.dataVencimento ? new Date(data.dataVencimento) : undefined,
            }
        });
    }

    async deleteExame(id: string): Promise<void> {
        await this.prisma.exameOcupacional.delete({ where: { id } });
    }
}
