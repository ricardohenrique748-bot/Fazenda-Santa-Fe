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
exports.RelatoriosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RelatoriosService = class RelatoriosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardGeral() {
        const financeiro = await this.prisma.lancamentoFinanceiro.groupBy({
            by: ['tipo'],
            _sum: {
                valor: true,
            },
        });
        const veiculosCount = await this.prisma.veiculo.count();
        const manutencoesSoma = await this.prisma.manutencao.aggregate({
            _sum: {
                custoTotal: true,
            },
        });
        const pedidosAbertos = await this.prisma.pedidoCompra.count({
            where: { status: 'ABERTO' },
        });
        const funcionariosAtivos = await this.prisma.funcionario.count({
            where: { ativo: true },
        });
        const planejamentoArea = await this.prisma.planejamentoAgricola.aggregate({
            _sum: {
                areaHectares: true,
            },
        });
        return {
            financeiro: {
                receitas: financeiro.find((f) => f.tipo === 'RECEBER')?._sum.valor || 0,
                despesas: financeiro.find((f) => f.tipo === 'PAGAR')?._sum.valor || 0,
            },
            frota: {
                totalVeiculos: veiculosCount,
                custoManutencao: manutencoesSoma._sum.custoTotal || 0,
            },
            suprimentos: {
                pedidosPendentes: pedidosAbertos,
            },
            rh: {
                totalAtivos: funcionariosAtivos,
            },
            agricola: {
                areaTotalHectares: planejamentoArea._sum.areaHectares || 0,
            },
        };
    }
    async getCustoPorCultura() {
        const planejamentos = await this.prisma.planejamentoAgricola.findMany({
            include: {
                itens: true,
                cultura: true,
            }
        });
        const custos = {};
        planejamentos.forEach((p) => {
            const custoItens = p.itens.reduce((acc, item) => acc + item.quantidadeTotal, 0);
            const culturaNome = p.cultura?.nome || 'Não Identificada';
            custos[culturaNome] = (custos[culturaNome] || 0) + (custoItens * 10);
        });
        return Object.keys(custos).map(cultura => ({
            name: cultura,
            value: custos[cultura],
        }));
    }
};
exports.RelatoriosService = RelatoriosService;
exports.RelatoriosService = RelatoriosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RelatoriosService);
//# sourceMappingURL=relatorios.service.js.map