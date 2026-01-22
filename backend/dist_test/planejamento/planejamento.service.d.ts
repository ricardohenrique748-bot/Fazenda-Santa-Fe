import { PrismaService } from '../prisma/prisma.service';
import { PlanejamentoAgricola, AtividadePlanejada } from '@prisma/client';
export declare class PlanejamentoService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<PlanejamentoAgricola>;
    findAll(filters: {
        safraId?: string;
        fazendaId?: string;
    }): Promise<PlanejamentoAgricola[]>;
    findOne(id: string): Promise<PlanejamentoAgricola | null>;
    remove(id: string): Promise<{
        id: string;
        fazendaId: string;
        createdAt: Date;
        updatedAt: Date;
        talhaoId: string | null;
        safraId: string;
        culturaId: string | null;
        areaHectares: number;
        metaProdutividade: number | null;
        unidadeProdutividade: string | null;
        custoEstimadoTotal: number | null;
        custoPorHa: number | null;
    }>;
    getCronograma(startDate: string, endDate: string): Promise<AtividadePlanejada[]>;
}
