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
exports.GruposService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GruposService = class GruposService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.grupoProduto.create({ data });
    }
    async findAll(empresaId) {
        return this.prisma.grupoProduto.findMany({
            where: { empresaId },
            orderBy: { nome: 'asc' }
        });
    }
    async findOne(id, empresaId) {
        const grupo = await this.prisma.grupoProduto.findFirst({
            where: { id, empresaId }
        });
        if (!grupo)
            throw new common_1.NotFoundException('Grupo não encontrado');
        return grupo;
    }
    async update(id, empresaId, data) {
        await this.findOne(id, empresaId);
        return this.prisma.grupoProduto.update({
            where: { id },
            data
        });
    }
    async remove(id, empresaId) {
        await this.findOne(id, empresaId);
        return this.prisma.grupoProduto.delete({ where: { id } });
    }
};
exports.GruposService = GruposService;
exports.GruposService = GruposService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GruposService);
//# sourceMappingURL=grupos.service.js.map