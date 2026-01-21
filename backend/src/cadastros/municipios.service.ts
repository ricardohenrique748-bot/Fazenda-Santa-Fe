import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MunicipiosService {
    constructor(private prisma: PrismaService) { }

    create(data: any) {
        return this.prisma.municipio.create({ data });
    }

    findAll() {
        return this.prisma.municipio.findMany();
    }

    findOne(id: string) {
        return this.prisma.municipio.findUnique({ where: { id } });
    }

    update(id: string, data: any) {
        return this.prisma.municipio.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.municipio.delete({ where: { id } });
    }
}
