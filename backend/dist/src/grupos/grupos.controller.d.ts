import { GruposService } from './grupos.service';
export declare class GruposController {
    private readonly gruposService;
    constructor(gruposService: GruposService);
    create(req: any, body: {
        nome: string;
        descricao?: string;
    }): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }>;
    findAll(req: any): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }>;
    update(req: any, id: string, body: {
        nome?: string;
        descricao?: string;
    }): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }>;
}
