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
exports.DepositosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DepositosService = class DepositosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.deposito.create({ data });
    }
    async findAll(empresaId) {
        return this.prisma.deposito.findMany({
            where: { empresaId },
            include: {
                empresa: { select: { razaoSocial: true } }
            }
        });
    }
    async findOne(id, empresaId) {
        const deposito = await this.prisma.deposito.findFirst({
            where: { id, empresaId },
            include: {
                empresa: true,
                estoques: {
                    include: { produto: true }
                }
            }
        });
        if (!deposito)
            throw new Error('Depósito não encontrado');
        return deposito;
    }
    async update(id, data, empresaId) {
        await this.findOne(id, empresaId);
        return this.prisma.deposito.update({
            where: { id },
            data,
        });
    }
    async remove(id, empresaId) {
        await this.findOne(id, empresaId);
        return this.prisma.deposito.delete({
            where: { id },
        });
    }
};
exports.DepositosService = DepositosService;
exports.DepositosService = DepositosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepositosService);
//# sourceMappingURL=depositos.service.js.map