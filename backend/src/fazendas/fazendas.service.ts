import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FazendasService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.FazendaCreateInput) {
        // Validate custom logic if needed (e.g. check if empresa exists is done by prisma via foreign key)
        try {
            return await this.prisma.fazenda.create({ data });
        } catch (error) {
            throw new BadRequestException('Erro ao criar fazenda. Verifique os dados e a empresa vinculada.');
        }
    }

    async findAll() {
        return this.prisma.fazenda.findMany({
            include: { empresa: { select: { razaoSocial: true, nomeFantasia: true } } }
        });
    }

    async findOne(id: string) {
        return this.prisma.fazenda.findUnique({
            where: { id },
            include: { empresa: true }
        });
    }

    async update(id: string, data: Prisma.FazendaUpdateInput) {
        return this.prisma.fazenda.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.fazenda.delete({ where: { id } });
    }
}
