import { GruposService } from './grupos.service';
export declare class GruposController {
    private readonly gruposService;
    constructor(gruposService: GruposService);
    create(req: any, body: {
        nome: string;
        descricao?: string;
    }): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    update(req: any, id: string, body: {
        nome?: string;
        descricao?: string;
    }): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
}
