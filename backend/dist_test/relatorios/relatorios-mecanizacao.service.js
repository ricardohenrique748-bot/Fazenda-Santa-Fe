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
exports.RelatoriosMecanizacaoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const date_fns_1 = require("date-fns");
let RelatoriosMecanizacaoService = class RelatoriosMecanizacaoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardData(empresaId) {
        const now = new Date();
        const firstDayMonth = (0, date_fns_1.startOfMonth)(now);
        const lastDayMonth = (0, date_fns_1.endOfMonth)(now);
        const totalVeiculos = await this.prisma.veiculo.count({ where: { empresaId } });
        const ativos = await this.prisma.veiculo.count({ where: { empresaId, status: 'ATIVO' } });
        const emManutencao = await this.prisma.veiculo.count({ where: { empresaId, status: 'MANUTENCAO' } });
        const custoMensal = await this.prisma.manutencao.aggregate({
            where: {
                veiculo: { empresaId },
                data: {
                    gte: firstDayMonth,
                    lte: lastDayMonth
                }
            },
            _sum: { custoTotal: true }
        });
        const frotaPorTipo = await this.prisma.veiculo.groupBy({
            by: ['tipo'],
            where: { empresaId },
            _count: { id: true }
        });
        const evolucaoCustos = [];
        for (let i = 5; i >= 0; i--) {
            const date = (0, date_fns_1.subMonths)(now, i);
            const start = (0, date_fns_1.startOfMonth)(date);
            const end = (0, date_fns_1.endOfMonth)(date);
            const soma = await this.prisma.manutencao.aggregate({
                where: {
                    veiculo: { empresaId },
                    data: { gte: start, lte: end }
                },
                _sum: { custoTotal: true }
            });
            evolucaoCustos.push({
                mes: date.toLocaleString('pt-BR', { month: 'short' }),
                valor: soma._sum.custoTotal || 0
            });
        }
        const topVeiculos = await this.prisma.manutencao.groupBy({
            by: ['veiculoId'],
            where: { veiculo: { empresaId } },
            _sum: { custoTotal: true },
            orderBy: { _sum: { custoTotal: 'desc' } },
            take: 5
        });
        const topVeiculosComNome = await Promise.all(topVeiculos.map(async (v) => {
            const veiculo = await this.prisma.veiculo.findUnique({
                where: { id: v.veiculoId },
                select: { nome: true, placa: true }
            });
            return {
                nome: veiculo?.nome || 'Desconhecido',
                valor: v._sum.custoTotal || 0
            };
        }));
        return {
            kpis: {
                totalVeiculos,
                ativos,
                emManutencao,
                custoMensal: custoMensal._sum.custoTotal || 0,
            },
            frotaPorTipo: frotaPorTipo.map(f => ({ name: f.tipo, value: f._count.id })),
            evolucaoCustos,
            topVeiculos: topVeiculosComNome
        };
    }
};
exports.RelatoriosMecanizacaoService = RelatoriosMecanizacaoService;
exports.RelatoriosMecanizacaoService = RelatoriosMecanizacaoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RelatoriosMecanizacaoService);
//# sourceMappingURL=relatorios-mecanizacao.service.js.map