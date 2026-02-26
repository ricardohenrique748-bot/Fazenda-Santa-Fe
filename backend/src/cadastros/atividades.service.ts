import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AtividadesService {
  constructor(private prisma: PrismaService) { }

  create(data: any) {
    const cleanData = { ...data };
    delete cleanData.id;
    delete cleanData.createdAt;
    delete cleanData.updatedAt;
    return this.prisma.atividade.create({ data: cleanData });
  }

  findAll() {
    return this.prisma.atividade.findMany();
  }

  findOne(id: string) {
    return this.prisma.atividade.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    const cleanData = { ...data };
    delete cleanData.id;
    delete cleanData.createdAt;
    delete cleanData.updatedAt;
    return this.prisma.atividade.update({ where: { id }, data: cleanData });
  }

  remove(id: string) {
    return this.prisma.atividade.delete({ where: { id } });
  }
}
