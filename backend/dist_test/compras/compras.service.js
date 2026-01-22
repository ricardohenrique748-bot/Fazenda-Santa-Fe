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
exports.ComprasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ComprasService = class ComprasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createFornecedor(data, empresaId) {
        return this.prisma.fornecedor.create({
            data: {
                ...data,
                empresaId,
            }
        });
    }
    async getFornecedores(empresaId) {
        return this.prisma.fornecedor.findMany({
            where: { empresaId },
            orderBy: { razaoSocial: 'asc' },
        });
    }
    async createPedido(data, empresaId) {
        const { itens, ...pedidoData } = data;
        const valorTotal = itens.reduce((acc, item) => acc + (item.quantidade * item.valorUnitario), 0);
        return this.prisma.pedidoCompra.create({
            data: {
                ...pedidoData,
                valorTotal,
                dataPedido: new Date(pedidoData.dataPedido || new Date()),
                itens: {
                    create: itens.map((item) => ({
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
    async getPedidos(empresaId) {
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
    async createContrato(data) {
        return this.prisma.contratoComercial.create({
            data: {
                ...data,
                dataVencimento: new Date(data.dataVencimento),
            },
        });
    }
    async getContratos(empresaId) {
        return this.prisma.contratoComercial.findMany({
            where: {
                clienteRel: {
                    empresaId
                }
            },
            orderBy: { dataVencimento: 'asc' },
        });
    }
};
exports.ComprasService = ComprasService;
exports.ComprasService = ComprasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ComprasService);
//# sourceMappingURL=compras.service.js.map