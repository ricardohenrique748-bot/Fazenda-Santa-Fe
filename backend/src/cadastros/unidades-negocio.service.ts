import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UnidadesNegocioService {
    constructor(private prisma: PrismaService) { }

    create(data: any) {
        return this.prisma.unidadeNegocio.create({ data });
    }

    findAll() {
        return this.prisma.unidadeNegocio.findMany({ include: { empresa: true } });
    }

    findOne(id: string) {
        return this.prisma.unidadeNegocio.findUnique({ where: { id } });
    }

    update(id: string, data: any) {
        return this.prisma.unidadeNegocio.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.unidadeNegocio.delete({ where: { id } });
    }
}
