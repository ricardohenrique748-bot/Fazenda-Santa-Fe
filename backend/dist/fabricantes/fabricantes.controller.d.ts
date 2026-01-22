import { FabricantesService } from './fabricantes.service';
export declare class FabricantesController {
    private readonly fabricantesService;
    constructor(fabricantesService: FabricantesService);
    create(req: any, body: {
        nome: string;
    }): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(req: any): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(req: any, id: string, body: {
        nome?: string;
    }): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
