import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) { }

  async create(data: any) {
    console.log('DEBUG: Creating empresa with data:', JSON.stringify(data));
    try {
      const { socios, ...rest } = data;

      // Ensure optional fields are handled correctly (remove empty strings if needed or keep as null)
      // Prisma handles undefined as "do nothing" and null as "set to null".
      // Clean up empty strings for unique constraints if any
      if (rest.email === '') rest.email = null;
      if (rest.cnpj === '') rest.cnpj = null;
      if (rest.cpf === '') rest.cpf = null;

      // Auto-generate code if not provided
      if (!rest.codigo) {
        try {
          const lastEmpresa = await this.prisma.empresa.findFirst({
            orderBy: { createdAt: 'desc' }, // Order by creation date to find latest
          });

          // Logica simplificada de codigo: Pega o total + 1 se não for numero
          const count = await this.prisma.empresa.count();
          rest.codigo = (count + 1).toString();
        } catch (codeError) {
          console.error('Error generating code:', codeError);
          rest.codigo = '1'; // Fallback
        }
      }

      const created = await this.prisma.empresa.create({
        data: {
          ...rest,
          // Handle boolean conversion explicitly if coming as string
          ativo: rest.ativo === 'true' || rest.ativo === true,
          ignorarCaixaFinanceiro: rest.ignorarCaixaFinanceiro === 'true' || rest.ignorarCaixaFinanceiro === true,
          ignorarEstoque: rest.ignorarEstoque === 'true' || rest.ignorarEstoque === true,

          socios:
            socios && socios.length > 0
              ? {
                create: socios.map((s: any) => ({
                  nome: s.nome,
                  cpf: s.cpf || null,
                  cnpj: s.cnpj || null,
                  percentual: Number(s.percentual) || 0,
                  principal: Boolean(s.principal),
                })),
              }
              : undefined,
        },
      });
      console.log('DEBUG: Empresa created successfully:', created.id);
      return created;
    } catch (error: any) {
      console.error('CRITICAL: Error establishing empresa:', error);
      // Ensure specific message is propagated
      const message = error.message || 'Erro desconhecido ao criar empresa';
      // Prisma specific error handling
      if (error.code === 'P2002') {
        throw new HttpException(
          `Empresa já cadastrada com este ${error.meta?.target || 'dado único'}.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        `Falha ao criar empresa: ${message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    return this.prisma.empresa.findMany();
  }

  async findOne(id: string) {
    return this.prisma.empresa.findUnique({
      where: { id },
      include: { fazendas: true, socios: true },
    });
  }

  async update(id: string, data: any) {
    const { socios, ...rest } = data;

    return this.prisma.empresa.update({
      where: { id },
      data: {
        ...rest,
        socios: socios
          ? {
            deleteMany: {},
            create: socios.map((s: any) => ({
              nome: s.nome,
              cpf: s.cpf,
              cnpj: s.cnpj,
              percentual:
                typeof s.percentual === 'string'
                  ? parseFloat(s.percentual)
                  : s.percentual,
              principal: s.principal,
            })),
          }
          : undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.empresa.delete({ where: { id } });
  }
}
