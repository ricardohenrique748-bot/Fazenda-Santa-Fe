import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CulturasService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      const cleanData = { ...data };
      delete cleanData.id;
      delete cleanData.createdAt;
      delete cleanData.updatedAt;
      delete cleanData.planejamentos;

      // Converter strings vazias para null
      Object.keys(cleanData).forEach((key) => {
        if (
          typeof cleanData[key] === 'string' &&
          cleanData[key].trim() === ''
        ) {
          cleanData[key] = null;
        }
      });

      // Garantir tipos corretos para Prisma
      if (cleanData.cicloDias !== undefined && cleanData.cicloDias !== null) {
        cleanData.cicloDias =
          typeof cleanData.cicloDias === 'string'
            ? parseInt(cleanData.cicloDias, 10)
            : Number(cleanData.cicloDias);
        if (isNaN(cleanData.cicloDias)) cleanData.cicloDias = null;
      }

      // Simplificar Booleano
      const toBool = (v: any) => v === true || String(v) === 'true';
      if (cleanData.multicultura !== undefined)
        cleanData.multicultura = toBool(cleanData.multicultura);
      if (cleanData.controlaPlantio !== undefined)
        cleanData.controlaPlantio = toBool(cleanData.controlaPlantio);
      if (cleanData.exigirEspacamento !== undefined)
        cleanData.exigirEspacamento = toBool(cleanData.exigirEspacamento);

      // Extrair campos que podem não estar no Prisma Client compilado
      const estado = cleanData.estado ?? null;
      const municipio = cleanData.municipio ?? null;
      delete cleanData.estado;
      delete cleanData.municipio;

      // Inserir via Prisma model (sem estado/municipio)
      const created = await this.prisma.cultura.create({ data: cleanData });

      // Atualizar estado/municipio via raw SQL se existirem
      if (estado !== null || municipio !== null) {
        await this.prisma.$executeRawUnsafe(
          `UPDATE "Cultura" SET "estado" = $1, "municipio" = $2 WHERE id = $3`,
          estado,
          municipio,
          created.id,
        );
      }

      return { ...created, estado, municipio };
    } catch (error) {
      console.error(
        'ERRO AO CRIAR CULTURA (FULL ERROR):',
        JSON.stringify(error, null, 2),
      );
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
        if (
          typeof cleanData[key] === 'string' &&
          cleanData[key].trim() === ''
        ) {
          cleanData[key] = null;
        }
      });

      // Garantir tipos corretos para Prisma
      if (cleanData.cicloDias !== undefined && cleanData.cicloDias !== null) {
        cleanData.cicloDias =
          typeof cleanData.cicloDias === 'string'
            ? parseInt(cleanData.cicloDias, 10)
            : Number(cleanData.cicloDias);
        if (isNaN(cleanData.cicloDias)) cleanData.cicloDias = null;
      }

      // Simplificar Booleano
      const toBool = (v: any) => v === true || String(v) === 'true';
      if (cleanData.multicultura !== undefined)
        cleanData.multicultura = toBool(cleanData.multicultura);
      if (cleanData.controlaPlantio !== undefined)
        cleanData.controlaPlantio = toBool(cleanData.controlaPlantio);
      if (cleanData.exigirEspacamento !== undefined)
        cleanData.exigirEspacamento = toBool(cleanData.exigirEspacamento);

      // Extrair campos que podem não estar no Prisma Client compilado
      const estado =
        cleanData.estado !== undefined ? (cleanData.estado ?? null) : undefined;
      const municipio =
        cleanData.municipio !== undefined
          ? (cleanData.municipio ?? null)
          : undefined;
      delete cleanData.estado;
      delete cleanData.municipio;

      // Atualizar via Prisma model (sem estado/municipio)
      const updated = await this.prisma.cultura.update({
        where: { id },
        data: cleanData,
      });

      // Atualizar estado/municipio via raw SQL se vieram no payload
      if (estado !== undefined || municipio !== undefined) {
        await this.prisma.$executeRawUnsafe(
          `UPDATE "Cultura" SET "estado" = COALESCE($1, "estado"), "municipio" = COALESCE($2, "municipio") WHERE id = $3`,
          estado ?? null,
          municipio ?? null,
          id,
        );
      }

      return {
        ...updated,
        estado: estado ?? null,
        municipio: municipio ?? null,
      };
    } catch (error) {
      console.error(
        'ERRO AO ATUALIZAR CULTURA (FULL ERROR):',
        JSON.stringify(error, null, 2),
      );
      throw error;
    }
  }

  remove(id: string) {
    return this.prisma.cultura.delete({ where: { id } });
  }
}
