import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ComprasService {
    constructor(private prisma: PrismaService) { }

    // Fornecedores
    async createFornecedor(data: any, empresaId: string) {
        return this.prisma.fornecedor.create({
            data: {
                ...data,
                empresaId,
            }
        });
    }

    async getFornecedores(empresaId: string) {
        return this.prisma.fornecedor.findMany({
            where: { empresaId },
            orderBy: { razaoSocial: 'asc' },
        });
    }

    // Pedidos de Compra
    async createPedido(data: any, empresaId: string) {
        const { itens, ...pedidoData } = data;

        // Calcular valor total
        const valorTotal = itens.reduce((acc: number, item: any) => acc + (item.quantidade * item.valorUnitario), 0);

        return this.prisma.pedidoCompra.create({
            data: {
                ...pedidoData,
                valorTotal,
                dataPedido: new Date(pedidoData.dataPedido || new Date()),
                itens: {
                    create: itens.map((item: any) => ({
                        ...item,
                        subtotal: item.quantidade * item.valorUnitario,
                    })),
                },
            },
            include: {
                itens: true,
                fornecedor: true,
            },
        });
    }

    async getPedidos(empresaId: string) {
        return this.prisma.pedidoCompra.findMany({
            where: {
                fornecedor: {
                    empresaId
                }
            },
            include: {
                fornecedor: true,
                itens: {
                    include: {
                        produto: true,
                    },
                },
            },
            orderBy: { dataPedido: 'desc' },
        });
    }

    // Contratos Comerciais
    async createContrato(data: any) {
        // Here we assume data has clienteId which belongs to empresa.
        // Or we could enforce it. For now, leaving as-is but with date fix.
        return this.prisma.contratoComercial.create({
            data: {
                ...data,
                dataVencimento: new Date(data.dataVencimento),
            },
        });
    }

    async getContratos(empresaId: string) {
        return this.prisma.contratoComercial.findMany({
            where: {
                clienteRel: {
                    empresaId
                }
            },
            orderBy: { dataVencimento: 'asc' },
        });
    }
}
