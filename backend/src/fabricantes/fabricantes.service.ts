import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FabricantesService {
    constructor(private prisma: PrismaService) { }

    async create(data: { nome: string; empresaId: string }) {
        return this.prisma.fabricante.create({ data });
    }

    async findAll(empresaId: string) {
        return this.prisma.fabricante.findMany({
            where: { empresaId },
            orderBy: { nome: 'asc' }
        });
    }

    async findOne(id: string, empresaId: string) {
        const fabricante = await this.prisma.fabricante.findFirst({
            where: { id, empresaId }
        });
        if (!fabricante) throw new NotFoundException('Fabricante não encontrado');
        return fabricante;
    }

    async update(id: string, empresaId: string, data: { nome?: string }) {
        await this.findOne(id, empresaId);
        return this.prisma.fabricante.update({
            where: { id },
            data
        });
    }

    async remove(id: string, empresaId: string) {
        await this.findOne(id, empresaId);
        return this.prisma.fabricante.delete({ where: { id } });
    }
}
