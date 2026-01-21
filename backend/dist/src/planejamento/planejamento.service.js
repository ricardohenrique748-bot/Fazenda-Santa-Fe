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
exports.PlanejamentoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PlanejamentoService = class PlanejamentoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { itens, atividades, ...planData } = data;
        let custoEstimadoTotal = 0;
        const itensToCreate = itens.map((item) => {
            const quantidadeTotal = item.doseHa * planData.areaHectares;
            const custoItem = (item.custoUnitario || 0) * quantidadeTotal;
            custoEstimadoTotal += custoItem;
            return {
                produtoId: item.produtoId,
                doseHa: item.doseHa,
                quantidadeTotal
            };
        });
        const custoPorHa = planData.areaHectares > 0 ? custoEstimadoTotal / planData.areaHectares : 0;
        return this.prisma.planejamentoAgricola.create({
            data: {
                fazendaId: planData.fazendaId,
                safraId: planData.safraId,
                talhaoId: planData.talhaoId,
                culturaId: planData.culturaId,
                areaHectares: parseFloat(planData.areaHectares),
                metaProdutividade: planData.metaProdutividade ? parseFloat(planData.metaProdutividade) : null,
                unidadeProdutividade: planData.unidadeProdutividade,
                custoEstimadoTotal,
                custoPorHa,
                itens: {
                    create: itensToCreate
                },
                atividades: {
                    create: atividades.map((ativ) => ({
                        descricao: ativ.descricao,
                        dataPrevista: new Date(ativ.dataPrevista),
                        status: 'PLANEJADO',
                        etapa: ativ.etapa
                    }))
                }
            },
            include: {
                itens: { include: { produto: true } },
                atividades: true,
                fazenda: true,
                safra: true,
                talhao: true,
                cultura: true
            }
        });
    }
    async findAll(filters) {
        return this.prisma.planejamentoAgricola.findMany({
            where: {
                safraId: filters.safraId,
                fazendaId: filters.fazendaId
            },
            include: {
                fazenda: { select: { nome: true } },
                safra: { select: { nome: true } },
                _count: { select: { itens: true, atividades: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findOne(id) {
        return this.prisma.planejamentoAgricola.findUnique({
            where: { id },
            include: {
                itens: { include: { produto: true } },
                atividades: true,
                fazenda: true,
                safra: true,
                talhao: true,
                cultura: true
            }
        });
    }
    async remove(id) {
        await this.prisma.itemPlanejamento.deleteMany({ where: { planejamentoId: id } });
        await this.prisma.atividadePlanejada.deleteMany({ where: { planejamentoId: id } });
        return this.prisma.planejamentoAgricola.delete({ where: { id } });
    }
    async getCronograma(startDate, endDate) {
        return this.prisma.atividadePlanejada.findMany({
            where: {
                dataPrevista: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            },
            include: {
                planejamento: {
                    include: {
                        fazenda: { select: { nome: true } },
                        safra: { select: { nome: true } }
                    }
                }
            },
            orderBy: { dataPrevista: 'asc' }
        });
    }
};
exports.PlanejamentoService = PlanejamentoService;
exports.PlanejamentoService = PlanejamentoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanejamentoService);
//# sourceMappingURL=planejamento.service.js.map