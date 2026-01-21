import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RelatoriosService {
    constructor(private prisma: PrismaService) { }

    async getDashboardGeral() {
        // 1. Fluxo de Caixa (Financeiro)
        const financeiro = await this.prisma.lancamentoFinanceiro.groupBy({
            by: ['tipo'],
            _sum: {
                valor: true,
            },
        });

        // 2. Eficiência de Frota (Mecanização)
        const veiculosCount = await this.prisma.veiculo.count();
        const manutencoesSoma = await this.prisma.manutencao.aggregate({
            _sum: {
                custoTotal: true,
            },
        });

        // 3. Suprimentos (Estoque/Compras)
        const pedidosAbertos = await this.prisma.pedidoCompra.count({
            where: { status: 'ABERTO' },
        });

        // 4. RH (Funcionários)
        const funcionariosAtivos = await this.prisma.funcionario.count({
            where: { ativo: true },
        });

        // 5. Planejamento (Soja/Milho/etc)
        const planejamentoArea = await this.prisma.planejamentoAgricola.aggregate({
            _sum: {
                areaHectares: true,
            },
        });

        return {
            financeiro: {
                receitas: financeiro.find((f: any) => f.tipo === 'RECEBER')?._sum.valor || 0,
                despesas: financeiro.find((f: any) => f.tipo === 'PAGAR')?._sum.valor || 0,
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
        // Simulação de agregação complexa (Insumos do Planejamento + Manutenção Vinculada)
        const planejamentos = await this.prisma.planejamentoAgricola.findMany({
            include: {
                itens: true,
                cultura: true,
            }
        });

        // Agrupar por cultura
        const custos: Record<string, number> = {};
        planejamentos.forEach((p: any) => {
            const custoItens = p.itens.reduce((acc: number, item: any) => acc + item.quantidadeTotal, 0); // Simplificado
            const culturaNome = p.cultura?.nome || 'Não Identificada';
            custos[culturaNome] = (custos[culturaNome] || 0) + (custoItens * 10); // Multiplicador arbitrário para simular valor
        });

        return Object.keys(custos).map(cultura => ({
            name: cultura,
            value: custos[cultura],
        }));
    }
}
