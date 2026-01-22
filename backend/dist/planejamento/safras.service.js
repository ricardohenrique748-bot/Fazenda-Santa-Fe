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
exports.SafrasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SafrasService = class SafrasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.safra.create({
            data: {
                ...data,
                dataInicio: new Date(data.dataInicio),
                dataFim: new Date(data.dataFim),
            }
        });
    }
    async findAll() {
        return this.prisma.safra.findMany({
            orderBy: { dataInicio: 'desc' },
            include: {
                _count: {
                    select: { planejamentos: true }
                }
            }
        });
    }
    async findOne(id) {
        return this.prisma.safra.findUnique({
            where: { id },
            include: { planejamentos: true }
        });
    }
    async update(id, data) {
        return this.prisma.safra.update({
            where: { id },
            data: {
                ...data,
                dataInicio: data.dataInicio ? new Date(data.dataInicio) : undefined,
                dataFim: data.dataFim ? new Date(data.dataFim) : undefined,
            }
        });
    }
    async remove(id) {
        return this.prisma.safra.delete({ where: { id } });
    }
};
exports.SafrasService = SafrasService;
exports.SafrasService = SafrasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SafrasService);
//# sourceMappingURL=safras.service.js.map