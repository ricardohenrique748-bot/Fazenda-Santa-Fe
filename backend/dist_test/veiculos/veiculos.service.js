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
exports.VeiculosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VeiculosService = class VeiculosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(empresaId, data) {
        const { empresa, grupo, manutencoes, ...cleanData } = data;
        if (cleanData.placa) {
            const existingPlaca = await this.prisma.veiculo.findFirst({
                where: { placa: cleanData.placa, empresaId }
            });
            if (existingPlaca)
                throw new common_1.BadRequestException('Placa já cadastrada nesta empresa');
        }
        if (cleanData.numeroFrota) {
            const existingFrota = await this.prisma.veiculo.findFirst({
                where: { numeroFrota: cleanData.numeroFrota, empresaId }
            });
            if (existingFrota)
                throw new common_1.BadRequestException('Número de frota já cadastrado nesta empresa');
        }
        return this.prisma.veiculo.create({
            data: {
                ...cleanData,
                empresa: { connect: { id: empresaId } }
            }
        });
    }
    async findAll(empresaId) {
        return this.prisma.veiculo.findMany({
            where: { empresaId },
            include: {
                grupo: { select: { nome: true } }
            },
            orderBy: { nome: 'asc' }
        });
    }
    async findOne(empresaId, id) {
        return this.prisma.veiculo.findFirst({
            where: { id, empresaId },
            include: {
                grupo: true,
                manutencoes: {
                    orderBy: { data: 'desc' },
                    take: 10
                }
            }
        });
    }
    async update(empresaId, id, data) {
        const existing = await this.findOne(empresaId, id);
        if (!existing)
            throw new common_1.BadRequestException('Veículo não encontrado.');
        const { empresa, grupo, manutencoes, ...cleanData } = data;
        return this.prisma.veiculo.update({
            where: { id },
            data: cleanData,
        });
    }
    async remove(empresaId, id) {
        const existing = await this.findOne(empresaId, id);
        if (!existing)
            throw new common_1.BadRequestException('Veículo não encontrado.');
        return this.prisma.veiculo.delete({
            where: { id },
        });
    }
};
exports.VeiculosService = VeiculosService;
exports.VeiculosService = VeiculosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VeiculosService);
//# sourceMappingURL=veiculos.service.js.map