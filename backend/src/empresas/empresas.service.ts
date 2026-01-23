import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmpresasService {
    constructor(private prisma: PrismaService) { }

    async create(data: any) {
        const { socios, ...rest } = data;

        // Auto-generate code if not provided
        if (!rest.codigo) {
            const lastEmpresa = await this.prisma.empresa.findFirst({
                orderBy: { codigo: 'desc' },
                select: { codigo: true }
            });

            let nextCode = 1;
            if (lastEmpresa && lastEmpresa.codigo) {
                const lastCodeInt = parseInt(lastEmpresa.codigo);
                if (!isNaN(lastCodeInt)) {
                    nextCode = lastCodeInt + 1;
                }
            }
            rest.codigo = nextCode.toString();
        }

        return this.prisma.empresa.create({
            data: {
                ...rest,
                socios: socios ? {
                    create: socios
                } : undefined
            }
        });
    }

    async findAll() {
        return this.prisma.empresa.findMany();
    }

    async findOne(id: string) {
        return this.prisma.empresa.findUnique({
            where: { id },
            include: { fazendas: true, socios: true }
        });
    }

    async update(id: string, data: any) {
        const { socios, ...rest } = data;

        return this.prisma.empresa.update({
            where: { id },
            data: {
                ...rest,
                socios: socios ? {
                    deleteMany: {},
                    create: socios.map((s: any) => ({
                        nome: s.nome,
                        cpf: s.cpf,
                        cnpj: s.cnpj,
                        percentual: typeof s.percentual === 'string' ? parseFloat(s.percentual) : s.percentual,
                        principal: s.principal
                    }))
                } : undefined
            },
        });
    }

    async remove(id: string) {
        return this.prisma.empresa.delete({ where: { id } });
    }
}
