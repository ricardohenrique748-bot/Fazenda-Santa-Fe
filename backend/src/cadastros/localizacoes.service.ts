import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocalizacoesService {
    constructor(private prisma: PrismaService) { }

    create(data: any) {
        return this.prisma.localizacao.create({ data });
    }

    findAll() {
        return this.prisma.localizacao.findMany({ include: { fazenda: true } });
    }

    findOne(id: string) {
        return this.prisma.localizacao.findUnique({ where: { id }, include: { fazenda: true } });
    }

    update(id: string, data: any) {
        return this.prisma.localizacao.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.localizacao.delete({ where: { id } });
    }
}
