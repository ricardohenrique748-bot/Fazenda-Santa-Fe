import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FazendasService {
  constructor(private prisma: PrismaService) { }

  async create(data: any) {
    try {
      // Limpar campos indevidos
      const cleanData = { ...data };
      delete cleanData.id;
      delete cleanData.createdAt;
      delete cleanData.updatedAt;
      delete cleanData.empresa;

      // Converter campos numéricos
      if (cleanData.areaTotal !== undefined) {
        cleanData.areaTotal = parseFloat(String(cleanData.areaTotal)) || 0;
      }
      if (cleanData.areaProdutiva !== undefined) {
        cleanData.areaProdutiva = parseFloat(String(cleanData.areaProdutiva)) || 0;
      }

      // Converter strings vazias para null
      Object.keys(cleanData).forEach((key) => {
        if (typeof cleanData[key] === 'string' && cleanData[key].trim() === '' && key !== 'empresaId' && key !== 'nome') {
          cleanData[key] = null;
        }
      });

      return await this.prisma.fazenda.create({ data: cleanData });
    } catch (error: any) {
      throw new BadRequestException(
        `Erro ao criar fazenda: ${error.message || 'Verifique os dados e a empresa vinculada.'}`,
      );
    }
  }

  async findAll() {
    return this.prisma.fazenda.findMany({
      include: {
        empresa: { select: { razaoSocial: true, nomeFantasia: true } },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.fazenda.findUnique({
      where: { id },
      include: { empresa: true },
    });
  }

  async update(id: string, data: any) {
    // Limpar campos indevidos
    const cleanData = { ...data };
    delete cleanData.id;
    delete cleanData.createdAt;
    delete cleanData.updatedAt;
    delete cleanData.empresa;

    // Converter campos numéricos
    if (cleanData.areaTotal !== undefined) {
      cleanData.areaTotal = parseFloat(String(cleanData.areaTotal)) || 0;
    }
    if (cleanData.areaProdutiva !== undefined) {
      cleanData.areaProdutiva = parseFloat(String(cleanData.areaProdutiva)) || 0;
    }

    // Converter strings vazias para null
    Object.keys(cleanData).forEach((key) => {
      if (typeof cleanData[key] === 'string' && cleanData[key].trim() === '' && key !== 'empresaId' && key !== 'nome') {
        cleanData[key] = null;
      }
    });

    return this.prisma.fazenda.update({
      where: { id },
      data: cleanData,
    });
  }

  async remove(id: string) {
    return this.prisma.fazenda.delete({ where: { id } });
  }
}
