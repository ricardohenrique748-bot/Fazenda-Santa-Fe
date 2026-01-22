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
exports.ApontamentosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ApontamentosService = class ApontamentosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(empresaId, data) {
        const funcionarioId = data.funcionario?.connect?.id || data.funcionarioId;
        if (funcionarioId) {
            const func = await this.prisma.funcionario.findFirst({
                where: { id: funcionarioId, empresaId }
            });
            if (!func)
                throw new Error('Funcionário não pertence a esta empresa.');
        }
        return this.prisma.apontamento.create({ data });
    }
    async findAll(empresaId) {
        return this.prisma.apontamento.findMany({
            where: {
                funcionario: {
                    empresaId: empresaId
                }
            },
            include: {
                funcionario: { select: { nome: true } },
                fazenda: { select: { nome: true } }
            },
            orderBy: { data: 'desc' }
        });
    }
    async findOne(empresaId, id) {
        return this.prisma.apontamento.findFirst({
            where: {
                id,
                funcionario: {
                    empresaId: empresaId
                }
            },
            include: {
                funcionario: true,
                fazenda: true
            }
        });
    }
    async update(empresaId, id, data) {
        const existing = await this.findOne(empresaId, id);
        if (!existing)
            throw new Error('Apontamento não encontrado ou acesso negado.');
        const { funcionario, fazenda, ...cleanData } = data;
        return this.prisma.apontamento.update({
            where: { id },
            data: cleanData,
        });
    }
    async remove(empresaId, id) {
        const existing = await this.findOne(empresaId, id);
        if (!existing)
            throw new Error('Apontamento não encontrado ou acesso negado.');
        return this.prisma.apontamento.delete({
            where: { id },
        });
    }
};
exports.ApontamentosService = ApontamentosService;
exports.ApontamentosService = ApontamentosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApontamentosService);
//# sourceMappingURL=apontamentos.service.js.map