import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientesService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.ClienteCreateInput) {
        return this.prisma.cliente.create({ data });
    }

    async findAll(empresaId: string) {
        return this.prisma.cliente.findMany({
            where: { empresaId },
            orderBy: { razaoSocial: 'asc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.cliente.findUnique({ where: { id } });
    }

    async update(id: string, data: Prisma.ClienteUpdateInput) {
        return this.prisma.cliente.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.cliente.delete({ where: { id } });
    }
}
