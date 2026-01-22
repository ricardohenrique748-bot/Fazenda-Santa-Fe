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
exports.ProdutosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProdutosService = class ProdutosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const empresaId = data.empresaId;
        if (data.codigo) {
            const existing = await this.prisma.produto.findFirst({
                where: {
                    codigo: data.codigo,
                    empresaId: empresaId
                }
            });
            if (existing)
                throw new common_1.BadRequestException('Código de produto já cadastrado nesta empresa');
        }
        return this.prisma.produto.create({ data });
    }
    async findAll(empresaId) {
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
    async findOne(id, empresaId) {
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
        if (!produto)
            throw new common_1.BadRequestException('Produto não encontrado');
        return produto;
    }
    async update(id, data, empresaId) {
        await this.findOne(id, empresaId);
        return this.prisma.produto.update({
            where: { id },
            data,
        });
    }
    async remove(id, empresaId) {
        await this.findOne(id, empresaId);
        return this.prisma.produto.delete({
            where: { id },
        });
    }
};
exports.ProdutosService = ProdutosService;
exports.ProdutosService = ProdutosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProdutosService);
//# sourceMappingURL=produtos.service.js.map