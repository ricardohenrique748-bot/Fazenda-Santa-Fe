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
exports.ManutencoesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ManutencoesService = class ManutencoesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(empresaId, data) {
        const { veiculo, ...cleanData } = data;
        const veiculoExists = await this.prisma.veiculo.findFirst({
            where: { id: data.veiculo.connect?.id, empresaId }
        });
        if (!veiculoExists)
            throw new Error('Caminhão/Máquina não encontrada para esta empresa.');
        const manutencao = await this.prisma.manutencao.create({
            data: {
                ...cleanData,
                veiculo: { connect: { id: data.veiculo.connect?.id } }
            }
        });
        if (data.horimetroNoAto || data.odometroNoAto) {
            const updateData = {};
            if (data.horimetroNoAto)
                updateData.horimetroAtual = data.horimetroNoAto;
            if (data.odometroNoAto)
                updateData.odometroAtual = data.odometroNoAto;
            await this.prisma.veiculo.update({
                where: { id: data.veiculo.connect?.id },
                data: updateData
            });
        }
        return manutencao;
    }
    async findAll(empresaId) {
        return this.prisma.manutencao.findMany({
            where: {
                veiculo: { empresaId }
            },
            include: {
                veiculo: { select: { nome: true, placa: true, numeroFrota: true } }
            },
            orderBy: { data: 'desc' }
        });
    }
    async findOne(empresaId, id) {
        return this.prisma.manutencao.findFirst({
            where: {
                id,
                veiculo: { empresaId }
            },
            include: { veiculo: true }
        });
    }
    async update(empresaId, id, data) {
        const existing = await this.findOne(empresaId, id);
        if (!existing)
            throw new Error('Manutenção não encontrada.');
        const { veiculo, ...cleanData } = data;
        return this.prisma.manutencao.update({
            where: { id },
            data: cleanData,
        });
    }
    async remove(empresaId, id) {
        const existing = await this.findOne(empresaId, id);
        if (!existing)
            throw new Error('Manutenção não encontrada.');
        return this.prisma.manutencao.delete({
            where: { id },
        });
    }
};
exports.ManutencoesService = ManutencoesService;
exports.ManutencoesService = ManutencoesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ManutencoesService);
//# sourceMappingURL=manutencoes.service.js.map