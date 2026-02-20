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

      // Remove campos que não pertencem ao schema do Prisma
      delete rest.id;
      delete rest.createdAt;
      delete rest.updatedAt;
      delete rest.fazendas;

      // General sanitization: Convert empty strings to null for all optional string fields
      Object.keys(rest).forEach((key) => {
        if (typeof rest[key] === 'string' && rest[key].trim() === '') {
          rest[key] = null;
        }
      });

      // Specific number handling - uso !== undefined para não ignorar valor 0
      if (rest.aliquotaRat !== undefined && rest.aliquotaRat !== null) {
        const num = parseFloat(String(rest.aliquotaRat));
        rest.aliquotaRat = isNaN(num) ? null : num;
      }

      // Auto-generate code if not provided
      if (!rest.codigo) {
        try {
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
          // Handle boolean conversion explicitly if coming as string or undefined/null
          ativo: rest.ativo !== false && rest.ativo !== 'false', // Default true
          ignorarCaixaFinanceiro: rest.ignorarCaixaFinanceiro === 'true' || rest.ignorarCaixaFinanceiro === true,
          ignorarEstoque: rest.ignorarEstoque === 'true' || rest.ignorarEstoque === true,

          socios:
            socios && socios.length > 0
              ? {
                create: socios.map((s: any) => ({
                  nome: s.nome,
                  cpf: s.cpf || null,
                  cnpj: s.cnpj || null,
                  percentual: s.percentual ? Number(s.percentual) : null,
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
    try {
      const empresa = await this.prisma.empresa.findUnique({
        where: { id },
        include: { fazendas: true, socios: true },
      });
      if (!empresa) {
        throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
      }
      return empresa;
    } catch (error: any) {
      console.error('Erro ao buscar empresa:', error);
      throw new HttpException(
        error instanceof HttpException ? error.message : `Erro ao buscar empresa: ${error.message}`,
        error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, data: any) {
    const { socios, ...rest } = data;

    // Remove campos que não pertencem ao schema do Prisma
    delete rest.id;
    delete rest.createdAt;
    delete rest.updatedAt;
    delete rest.fazendas;

    // General sanitization: Convert empty strings to null for all optional string fields
    Object.keys(rest).forEach((key) => {
      if (typeof rest[key] === 'string' && rest[key].trim() === '') {
        rest[key] = null;
      }
    });

    // Specific number handling - uso !== undefined para não ignorar valor 0
    if (rest.aliquotaRat !== undefined && rest.aliquotaRat !== null) {
      const num = parseFloat(String(rest.aliquotaRat));
      rest.aliquotaRat = isNaN(num) ? null : num;
    }

    return this.prisma.empresa.update({
      where: { id },
      data: {
        ...rest,
        // Handle boolean conversion explicitly if coming as string or undefined/null
        ativo: rest.ativo !== false && rest.ativo !== 'false', // Default true
        ignorarCaixaFinanceiro: rest.ignorarCaixaFinanceiro === 'true' || rest.ignorarCaixaFinanceiro === true,
        ignorarEstoque: rest.ignorarEstoque === 'true' || rest.ignorarEstoque === true,

        socios: socios
          ? {
            deleteMany: {},
            create: socios.map((s: any) => ({
              nome: s.nome,
              cpf: s.cpf || null,
              cnpj: s.cnpj || null,
              percentual:
                typeof s.percentual === 'string'
                  ? parseFloat(s.percentual)
                  : s.percentual,
              principal: Boolean(s.principal),
            })),
          }
          : undefined,
      },
    });
  }

  async remove(id: string) {
    // Delete in cascade order manually if DB doesn't support it or if safer
    // Also handling dependencies is critical.
    try {
      await this.prisma.$transaction([
        this.prisma.socio.deleteMany({ where: { empresaId: id } }),
        this.prisma.fazenda.deleteMany({ where: { empresaId: id } }),
        // Add other relations here as they appear. For now, socios and fazendas are key.
        this.prisma.usuario.deleteMany({ where: { empresaId: id } }),
        this.prisma.funcionario.deleteMany({ where: { empresaId: id } }),
        this.prisma.cliente.deleteMany({ where: { empresaId: id } }),
        this.prisma.empresa.delete({ where: { id } }),
      ]);
      return { message: 'Empresa e dados vinculados removidos com sucesso' };
    } catch (error: any) {
      console.error('Erro ao excluir empresa:', error);
      throw new HttpException(
        `Não foi possível excluir a empresa. Pode haver registros vinculados não tratados. Detalhe: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
