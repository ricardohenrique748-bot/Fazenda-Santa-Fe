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
exports.GruposEquipamentoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GruposEquipamentoService = class GruposEquipamentoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(empresaId, data) {
        return this.prisma.grupoEquipamento.create({
            data: {
                ...data,
                empresa: { connect: { id: empresaId } }
            }
        });
    }
    async findAll(empresaId) {
        return this.prisma.grupoEquipamento.findMany({
            where: { empresaId },
            include: {
                _count: {
                    select: { veiculos: true }
                }
            },
            orderBy: { nome: 'asc' }
        });
    }
    async findOne(empresaId, id) {
        return this.prisma.grupoEquipamento.findFirst({
            where: { id, empresaId },
            include: {
                veiculos: {
                    select: { nome: true, placa: true, status: true }
                }
            }
        });
    }
    async update(empresaId, id, data) {
        const existing = await this.findOne(empresaId, id);
        if (!existing)
            throw new common_1.BadRequestException('Grupo de equipamento não encontrado.');
        const { empresa, veiculos, ...cleanData } = data;
        return this.prisma.grupoEquipamento.update({
            where: { id },
            data: cleanData,
        });
    }
    async remove(empresaId, id) {
        const existing = await this.findOne(empresaId, id);
        if (!existing)
            throw new common_1.BadRequestException('Grupo de equipamento não encontrado.');
        const count = await this.prisma.veiculo.count({ where: { grupoId: id } });
        if (count > 0) {
            throw new common_1.BadRequestException('Não é possível excluir um grupo que possui equipamentos vinculados.');
        }
        return this.prisma.grupoEquipamento.delete({
            where: { id },
        });
    }
};
exports.GruposEquipamentoService = GruposEquipamentoService;
exports.GruposEquipamentoService = GruposEquipamentoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GruposEquipamentoService);
//# sourceMappingURL=grupos-equipamento.service.js.map