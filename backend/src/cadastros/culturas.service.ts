import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CulturasService {
  constructor(private prisma: PrismaService) { }

  async create(data: any) {
    try {
      const cleanData = { ...data };
      delete cleanData.id;
      delete cleanData.createdAt;
      delete cleanData.updatedAt;
      delete cleanData.planejamentos;

      // Converter strings vazias para null
      Object.keys(cleanData).forEach((key) => {
        if (typeof cleanData[key] === 'string' && cleanData[key].trim() === '') {
          cleanData[key] = null;
        }
      });

      // Garantir tipos corretos para Prisma
      if (cleanData.cicloDias !== undefined && cleanData.cicloDias !== null) {
        cleanData.cicloDias = typeof cleanData.cicloDias === 'string' ? parseInt(cleanData.cicloDias, 10) : Number(cleanData.cicloDias);
      }

      // Simplificar Booleano
      const toBool = (v: any) => v === true || String(v) === 'true';
      if (cleanData.multicultura !== undefined) cleanData.multicultura = toBool(cleanData.multicultura);
      if (cleanData.controlaPlantio !== undefined) cleanData.controlaPlantio = toBool(cleanData.controlaPlantio);
      if (cleanData.exigirEspacamento !== undefined) cleanData.exigirEspacamento = toBool(cleanData.exigirEspacamento);

      return await this.prisma.cultura.create({ data: cleanData });
    } catch (error) {
      console.error('ERRO AO CRIAR CULTURA:', error);
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
    try {
      const cleanData = { ...data };
      delete cleanData.id;
      delete cleanData.createdAt;
      delete cleanData.updatedAt;
      delete cleanData.planejamentos;

      // Converter strings vazias para null
      Object.keys(cleanData).forEach((key) => {
        if (typeof cleanData[key] === 'string' && cleanData[key].trim() === '') {
          cleanData[key] = null;
        }
      });

      // Garantir tipos corretos para Prisma
      if (cleanData.cicloDias !== undefined && cleanData.cicloDias !== null) {
        cleanData.cicloDias = typeof cleanData.cicloDias === 'string' ? parseInt(cleanData.cicloDias, 10) : Number(cleanData.cicloDias);
      }

      // Simplificar Booleano
      const toBool = (v: any) => v === true || String(v) === 'true';
      if (cleanData.multicultura !== undefined) cleanData.multicultura = toBool(cleanData.multicultura);
      if (cleanData.controlaPlantio !== undefined) cleanData.controlaPlantio = toBool(cleanData.controlaPlantio);
      if (cleanData.exigirEspacamento !== undefined) cleanData.exigirEspacamento = toBool(cleanData.exigirEspacamento);

      return await this.prisma.cultura.update({ where: { id }, data: cleanData });
    } catch (error) {
      console.error('ERRO AO ATUALIZAR CULTURA:', error);
      throw error;
    }
  }

  remove(id: string) {
    return this.prisma.cultura.delete({ where: { id } });
  }
}
