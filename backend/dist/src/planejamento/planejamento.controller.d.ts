import { SafrasService } from './safras.service';
import { PlanejamentoService } from './planejamento.service';
export declare class PlanejamentoController {
    private readonly safrasService;
    private readonly planejamentoService;
    constructor(safrasService: SafrasService, planejamentoService: PlanejamentoService);
    createSafra(data: any): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        dataInicio: Date;
        dataFim: Date;
    }>;
    findAllSafras(): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        dataInicio: Date;
        dataFim: Date;
    }[]>;
    findOneSafra(id: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        dataInicio: Date;
        dataFim: Date;
    } | null>;
    updateSafra(id: string, data: any): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        dataInicio: Date;
        dataFim: Date;
    }>;
    removeSafra(id: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        dataInicio: Date;
        dataFim: Date;
    }>;
    createPlanejamento(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fazendaId: string;
        talhaoId: string | null;
        safraId: string;
        culturaId: string | null;
        areaHectares: number;
        metaProdutividade: number | null;
        unidadeProdutividade: string | null;
        custoEstimadoTotal: number | null;
        custoPorHa: number | null;
    }>;
    findAllPlanejamentos(safraId?: string, fazendaId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fazendaId: string;
        talhaoId: string | null;
        safraId: string;
        culturaId: string | null;
        areaHectares: number;
        metaProdutividade: number | null;
        unidadeProdutividade: string | null;
        custoEstimadoTotal: number | null;
        custoPorHa: number | null;
    }[]>;
    getCronograma(start: string, end: string): Promise<{
        id: string;
        createdAt: Date;
        descricao: string;
        status: string;
        dataPrevista: Date;
        etapa: import("@prisma/client").$Enums.EtapaAgricola | null;
        planejamentoId: string;
    }[]>;
    findOnePlanejamento(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fazendaId: string;
        talhaoId: string | null;
        safraId: string;
        culturaId: string | null;
        areaHectares: number;
        metaProdutividade: number | null;
        unidadeProdutividade: string | null;
        custoEstimadoTotal: number | null;
        custoPorHa: number | null;
    } | null>;
    removePlanejamento(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fazendaId: string;
        talhaoId: string | null;
        safraId: string;
        culturaId: string | null;
        areaHectares: number;
        metaProdutividade: number | null;
        unidadeProdutividade: string | null;
        custoEstimadoTotal: number | null;
        custoPorHa: number | null;
    }>;
}
