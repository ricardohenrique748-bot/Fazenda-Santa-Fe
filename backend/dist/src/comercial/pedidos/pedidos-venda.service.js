"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosVendaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PedidosVendaService = class PedidosVendaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { itens, ...rest } = data;
        return this.prisma.pedidoVenda.create({
            data: {
                ...rest,
                itens: {
                    create: itens
                }
            },
            include: {
                itens: { include: { produto: true } },
                cliente: true
            }
        });
    }
    async findAll(empresaId) {
        return this.prisma.pedidoVenda.findMany({
            where: { empresaId },
            include: {
                cliente: true,
                itens: { select: { id: true, quantidade: true, subtotal: true } }
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
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
    async update(id, data) {
        return this.prisma.pedidoVenda.update({
            where: { id },
            data,
            include: { itens: true }
        });
    }
    async remove(id) {
        const deleteItems = this.prisma.itemPedidoVenda.deleteMany({
            where: { pedidoVendaId: id },
        });
        const deletePedido = this.prisma.pedidoVenda.delete({
            where: { id },
        });
        return this.prisma.$transaction([deleteItems, deletePedido]);
    }
};
exports.PedidosVendaService = PedidosVendaService;
exports.PedidosVendaService = PedidosVendaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PedidosVendaService);
//# sourceMappingURL=pedidos-venda.service.js.map