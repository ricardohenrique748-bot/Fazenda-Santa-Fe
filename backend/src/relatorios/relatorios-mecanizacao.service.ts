import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

@Injectable()
export class RelatoriosMecanizacaoService {
    constructor(private prisma: PrismaService) { }

    async getDashboardData(empresaId: string) {
        const now = new Date();
        const firstDayMonth = startOfMonth(now);
        const lastDayMonth = endOfMonth(now);

        // KPIs
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

        // Gráfico: Frota por Tipo
        const frotaPorTipo = await this.prisma.veiculo.groupBy({
            by: ['tipo'],
            where: { empresaId },
            _count: { id: true }
        });

        // Gráfico: Evolução de Custos (Últimos 6 meses)
        const evolucaoCustos = [];
        for (let i = 5; i >= 0; i--) {
            const date = subMonths(now, i);
            const start = startOfMonth(date);
            const end = endOfMonth(date);

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

        // Gráfico: Top 5 Veículos mais caros
        const topVeiculos = await this.prisma.manutencao.groupBy({
            by: ['veiculoId'],
            where: { veiculo: { empresaId } },
            _sum: { custoTotal: true },
            orderBy: { _sum: { custoTotal: 'desc' } },
            take: 5
        });

        // Buscar nomes dos veículos para o Top 5
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
}
