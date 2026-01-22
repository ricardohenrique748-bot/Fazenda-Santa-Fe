import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmpresasService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.EmpresaCreateInput) {
        // Auto-generate code if not provided
        if (!data.codigo) {
            const lastEmpresa = await this.prisma.empresa.findFirst({
                orderBy: { codigo: 'desc' },
                select: { codigo: true }
            });

            let nextCode = 1;
            if (lastEmpresa && lastEmpresa.codigo) {
                const lastCodeInt = parseInt(lastEmpresa.codigo);
                if (!isNaN(lastCodeInt)) {
                    nextCode = lastCodeInt + 1;
                }
            }
            data.codigo = nextCode.toString(); // Simple numeric code for now
        }
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
