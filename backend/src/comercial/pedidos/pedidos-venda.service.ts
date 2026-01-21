import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PedidosVendaService {
    constructor(private prisma: PrismaService) { }

    async create(data: any) {
        // Expect data to have itens array
        // { clienteId, dataPedido, status, valorTotal, itens: [{ produtoId, quantidade, valorUnitario, subtotal }] }
        // We need to map this to Prisma create input
        const { itens, ...rest } = data;

        return this.prisma.pedidoVenda.create({
            data: {
                ...rest,
                itens: {
                    create: itens // Assumes itens match ItemPedidoVendaCreateWithoutPedidoVendaInput
                }
            },
            include: {
                itens: { include: { produto: true } },
                cliente: true
            }
        });
    }

    async findAll(empresaId: string) {
        return this.prisma.pedidoVenda.findMany({
            where: { empresaId },
            include: {
                cliente: true,
                itens: { select: { id: true, quantidade: true, subtotal: true } } // summary
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.pedidoVenda.findUnique({
            where: { id },
            include: {
                cliente: true,
                itens: {
                    include: { produto: true }
                }
            }
        });
    }

    async update(id: string, data: any) {
        // Complex update (re-creating items often easier, but for simplicity just update main fields for now, or handle items creation/deletion)
        // For MVP, allow updating status/header. To update items, maybe deleteMany and createMany?
        // Let's assume standard generic update for header fields.
        return this.prisma.pedidoVenda.update({
            where: { id },
            data,
            include: { itens: true }
        });
    }

    async remove(id: string) {
        // Cascade delete is not set in schema (default), so might need to delete items first?
        // Prisma usually requires manual deletion or OnDelete Cascade.
        // I'll try delete, if fails I'll add items deletion.
        const deleteItems = this.prisma.itemPedidoVenda.deleteMany({
            where: { pedidoVendaId: id },
        });
        const deletePedido = this.prisma.pedidoVenda.delete({
            where: { id },
        });
        return this.prisma.$transaction([deleteItems, deletePedido]);
    }
}
