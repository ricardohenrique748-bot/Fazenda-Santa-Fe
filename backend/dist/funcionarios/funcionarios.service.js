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
exports.FuncionariosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FuncionariosService = class FuncionariosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(empresaId, data) {
        const existing = await this.prisma.funcionario.findFirst({
            where: {
                cpf: data.cpf,
                empresaId: empresaId
            }
        });
        if (existing) {
            throw new common_1.BadRequestException('CPF já cadastrado nesta empresa.');
        }
        const { empresa, apontamentos, entregasEPI, exames, ...cleanData } = data;
        return this.prisma.funcionario.create({
            data: {
                ...cleanData,
                empresa: { connect: { id: empresaId } }
            }
        });
    }
    async findAll(empresaId) {
        return this.prisma.funcionario.findMany({
            where: { empresaId },
            include: {
                empresa: {
                    select: { razaoSocial: true }
                }
            },
            orderBy: { nome: 'asc' }
        });
    }
    async findOne(empresaId, id) {
        return this.prisma.funcionario.findFirst({
            where: { id, empresaId },
            include: { empresa: true }
        });
    }
    async update(empresaId, id, data) {
        const existing = await this.findOne(empresaId, id);
        if (!existing)
            throw new common_1.BadRequestException('Funcionário não encontrado.');
        const { empresa, apontamentos, entregasEPI, exames, empresaId: _unused, ...cleanData } = data;
        return this.prisma.funcionario.update({
            where: { id },
            data: cleanData,
        });
    }
    async remove(empresaId, id) {
        const existing = await this.findOne(empresaId, id);
        if (!existing)
            throw new common_1.BadRequestException('Funcionário não encontrado.');
        return this.prisma.funcionario.delete({
            where: { id },
        });
    }
};
exports.FuncionariosService = FuncionariosService;
exports.FuncionariosService = FuncionariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FuncionariosService);
//# sourceMappingURL=funcionarios.service.js.map