import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CulturasService {
    constructor(private prisma: PrismaService) { }

    create(data: any) {
        return this.prisma.cultura.create({ data });
    }

    findAll() {
        return this.prisma.cultura.findMany();
    }

    findOne(id: string) {
        return this.prisma.cultura.findUnique({ where: { id } });
    }

    update(id: string, data: any) {
        return this.prisma.cultura.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.cultura.delete({ where: { id } });
    }
}
