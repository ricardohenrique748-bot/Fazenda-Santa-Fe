import { PrismaService } from '../prisma/prisma.service';
import { EPI, EntregaEPI, ExameOcupacional } from '@prisma/client';
export declare class SegurancaService {
    private prisma;
    constructor(prisma: PrismaService);
    createEPI(data: any): Promise<EPI>;
    getEPIs(): Promise<EPI[]>;
    getEPIById(id: string): Promise<EPI | null>;
    updateEPI(id: string, data: any): Promise<EPI>;
    deleteEPI(id: string): Promise<void>;
    createEntrega(data: any): Promise<EntregaEPI>;
    getEntregas(funcionarioId?: string): Promise<EntregaEPI[]>;
    createExame(data: any): Promise<ExameOcupacional>;
    getExames(funcionarioId?: string): Promise<ExameOcupacional[]>;
    getExameById(id: string): Promise<ExameOcupacional | null>;
    updateExame(id: string, data: any): Promise<ExameOcupacional>;
    deleteExame(id: string): Promise<void>;
}
