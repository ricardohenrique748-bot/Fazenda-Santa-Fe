import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CulturasService {
  constructor(private prisma: PrismaService) { }

  async create(data: any) {
    const { estado, municipio, ...prismaData } = data;
    try {
      return await this.prisma.cultura.create({ data: prismaData });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.prisma.cultura.findMany();
  }

  findOne(id: string) {
    return this.prisma.cultura.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    const { estado, municipio, ...prismaData } = data;
    try {
      return await this.prisma.cultura.update({ where: { id }, data: prismaData });
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    return this.prisma.cultura.delete({ where: { id } });
  }
}
