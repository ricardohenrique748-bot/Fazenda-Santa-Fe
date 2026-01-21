import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmpresasService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.EmpresaCreateInput) {
        return this.prisma.empresa.create({ data });
    }

    async findAll() {
        return this.prisma.empresa.findMany();
    }

    async findOne(id: string) {
        return this.prisma.empresa.findUnique({ where: { id } });
    }

    async update(id: string, data: Prisma.EmpresaUpdateInput) {
        return this.prisma.empresa.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.empresa.delete({ where: { id } });
    }
}
