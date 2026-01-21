import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GruposService {
    constructor(private prisma: PrismaService) { }

    async create(data: { nome: string; descricao?: string; empresaId: string }) {
        return this.prisma.grupoProduto.create({ data });
    }

    async findAll(empresaId: string) {
        return this.prisma.grupoProduto.findMany({
            where: { empresaId },
            orderBy: { nome: 'asc' }
        });
    }

    async findOne(id: string, empresaId: string) {
        const grupo = await this.prisma.grupoProduto.findFirst({
            where: { id, empresaId }
        });
        if (!grupo) throw new NotFoundException('Grupo não encontrado');
        return grupo;
    }

    async update(id: string, empresaId: string, data: { nome?: string; descricao?: string }) {
        await this.findOne(id, empresaId); // Validate existence/ownership
        return this.prisma.grupoProduto.update({
            where: { id },
            data
        });
    }

    async remove(id: string, empresaId: string) {
        await this.findOne(id, empresaId);
        return this.prisma.grupoProduto.delete({ where: { id } });
    }
}
