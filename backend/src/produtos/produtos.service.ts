import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Produto, Prisma } from '@prisma/client';

@Injectable()
export class ProdutosService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.ProdutoCreateInput): Promise<Produto> {
        // Explicitly cast to any to access empresaId strictly if Typescript complains about input type mismatch before generation
        // But since we updated schema, it should be fine after generation.
        const empresaId = (data as any).empresaId;

        if (data.codigo) {
            const existing = await this.prisma.produto.findFirst({
                where: {
                    codigo: data.codigo,
                    empresaId: empresaId
                }
            });
            if (existing) throw new BadRequestException('Código de produto já cadastrado nesta empresa');
        }
        return this.prisma.produto.create({ data });
    }

    async findAll(empresaId: string) {
        return this.prisma.produto.findMany({
            where: { empresaId },
            include: {
                estoques: {
                    include: { deposito: { select: { nome: true } } }
                }
            },
            orderBy: { nome: 'asc' }
        });
    }

    async findOne(id: string, empresaId: string) {
        const produto = await this.prisma.produto.findFirst({
            where: { id, empresaId },
            include: {
                estoques: {
                    include: { deposito: true }
                },
                movimentacoes: {
                    orderBy: { data: 'desc' },
                    take: 50,
                    include: { deposito: true, usuario: { select: { nome: true } } }
                }
            }
        });
        if (!produto) throw new BadRequestException('Produto não encontrado');
        return produto;
    }

    async update(id: string, data: Prisma.ProdutoUpdateInput, empresaId: string): Promise<Produto> {
        // Ensure exists and belongs to empresa
        await this.findOne(id, empresaId);

        return this.prisma.produto.update({
            where: { id },
            data,
        });
    }

    async remove(id: string, empresaId: string): Promise<Produto> {
        await this.findOne(id, empresaId);
        return this.prisma.produto.delete({
            where: { id },
        });
    }
}
