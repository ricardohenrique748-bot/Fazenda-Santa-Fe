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
exports.SegurancaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SegurancaService = class SegurancaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEPI(data) {
        return this.prisma.ePI.create({ data });
    }
    async getEPIs() {
        return this.prisma.ePI.findMany({
            orderBy: { nome: 'asc' },
        });
    }
    async getEPIById(id) {
        return this.prisma.ePI.findUnique({ where: { id } });
    }
    async updateEPI(id, data) {
        return this.prisma.ePI.update({ where: { id }, data });
    }
    async deleteEPI(id) {
        await this.prisma.ePI.delete({ where: { id } });
    }
    async createEntrega(data) {
        return this.prisma.entregaEPI.create({
            data: {
                ...data,
                dataEntrega: new Date(data.dataEntrega),
            },
        });
    }
    async getEntregas(funcionarioId) {
        return this.prisma.entregaEPI.findMany({
            where: funcionarioId ? { funcionarioId } : {},
            include: {
                funcionario: true,
                epi: true,
            },
            orderBy: { dataEntrega: 'desc' },
        });
    }
    async createExame(data) {
        return this.prisma.exameOcupacional.create({
            data: {
                ...data,
                dataRealizacao: new Date(data.dataRealizacao),
                dataVencimento: new Date(data.dataVencimento),
            },
        });
    }
    async getExames(funcionarioId) {
        return this.prisma.exameOcupacional.findMany({
            where: funcionarioId ? { funcionarioId } : {},
            include: {
                funcionario: true,
            },
            orderBy: { dataVencimento: 'asc' },
        });
    }
    async getExameById(id) {
        return this.prisma.exameOcupacional.findUnique({ where: { id } });
    }
    async updateExame(id, data) {
        return this.prisma.exameOcupacional.update({
            where: { id },
            data: {
                ...data,
                dataRealizacao: data.dataRealizacao ? new Date(data.dataRealizacao) : undefined,
                dataVencimento: data.dataVencimento ? new Date(data.dataVencimento) : undefined,
            }
        });
    }
    async deleteExame(id) {
        await this.prisma.exameOcupacional.delete({ where: { id } });
    }
};
exports.SegurancaService = SegurancaService;
exports.SegurancaService = SegurancaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SegurancaService);
//# sourceMappingURL=seguranca.service.js.map