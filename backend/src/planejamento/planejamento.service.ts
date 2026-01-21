import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanejamentoAgricola, ItemPlanejamento, AtividadePlanejada } from '@prisma/client';

@Injectable()
export class PlanejamentoService {
    constructor(private prisma: PrismaService) { }

    async create(data: any): Promise<PlanejamentoAgricola> {
        const { itens, atividades, ...planData } = data;

        // Calculate costs (Mock logic: assume simple unit cost for now, or 0 if not available)
        // In a real scenario, we would fetch product costs from stock or catalog
        let custoEstimadoTotal = 0;

        // Prepare items and calculate cost
        const itensToCreate = itens.map((item: any) => {
            const quantidadeTotal = item.doseHa * planData.areaHectares;
            // Mock cost calculation: assuming we receive cost in item or fetch it. 
            // For now, let's assume the frontend sends 'custoUnitario' just for calculation, 
            // or we default to 0. 
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
                    create: atividades.map((ativ: any) => ({
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

    async findAll(filters: { safraId?: string, fazendaId?: string }): Promise<PlanejamentoAgricola[]> {
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

    async findOne(id: string): Promise<PlanejamentoAgricola | null> {
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

    async remove(id: string) {
        // Prisma will handle cascade delete if configured, or we do it manually
        await this.prisma.itemPlanejamento.deleteMany({ where: { planejamentoId: id } });
        await this.prisma.atividadePlanejada.deleteMany({ where: { planejamentoId: id } });
        return this.prisma.planejamentoAgricola.delete({ where: { id } });
    }

    async getCronograma(startDate: string, endDate: string): Promise<AtividadePlanejada[]> {
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
}
