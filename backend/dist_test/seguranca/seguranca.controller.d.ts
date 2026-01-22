import { SegurancaService } from './seguranca.service';
export declare class SegurancaController {
    private readonly segurancaService;
    constructor(segurancaService: SegurancaService);
    getEPIs(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        ativo: boolean;
        ca: string | null;
        validadeDias: number | null;
    }[]>;
    createEPI(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        ativo: boolean;
        ca: string | null;
        validadeDias: number | null;
    }>;
    getEPIById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        ativo: boolean;
        ca: string | null;
        validadeDias: number | null;
    } | null>;
    updateEPI(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        ativo: boolean;
        ca: string | null;
        validadeDias: number | null;
    }>;
    deleteEPI(id: string): Promise<void>;
    getEntregas(funcionarioId?: string): Promise<{
        id: string;
        quantidade: number;
        funcionarioId: string;
        createdAt: Date;
        epiId: string;
        dataEntrega: Date;
        observacao: string | null;
    }[]>;
    createEntrega(data: any): Promise<{
        id: string;
        quantidade: number;
        funcionarioId: string;
        createdAt: Date;
        epiId: string;
        dataEntrega: Date;
        observacao: string | null;
    }>;
    getExames(funcionarioId?: string): Promise<{
        id: string;
        tipo: string;
        funcionarioId: string;
        createdAt: Date;
        updatedAt: Date;
        dataVencimento: Date;
        dataRealizacao: Date;
        resultado: string;
        medico: string | null;
        crm: string | null;
    }[]>;
    createExame(data: any): Promise<{
        id: string;
        tipo: string;
        funcionarioId: string;
        createdAt: Date;
        updatedAt: Date;
        dataVencimento: Date;
        dataRealizacao: Date;
        resultado: string;
        medico: string | null;
        crm: string | null;
    }>;
    getExameById(id: string): Promise<{
        id: string;
        tipo: string;
        funcionarioId: string;
        createdAt: Date;
        updatedAt: Date;
        dataVencimento: Date;
        dataRealizacao: Date;
        resultado: string;
        medico: string | null;
        crm: string | null;
    } | null>;
    updateExame(id: string, data: any): Promise<{
        id: string;
        tipo: string;
        funcionarioId: string;
        createdAt: Date;
        updatedAt: Date;
        dataVencimento: Date;
        dataRealizacao: Date;
        resultado: string;
        medico: string | null;
        crm: string | null;
    }>;
    deleteExame(id: string): Promise<void>;
}
