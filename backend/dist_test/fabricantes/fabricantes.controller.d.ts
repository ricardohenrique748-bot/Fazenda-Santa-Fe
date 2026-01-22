import { FabricantesService } from './fabricantes.service';
export declare class FabricantesController {
    private readonly fabricantesService;
    constructor(fabricantesService: FabricantesService);
    create(req: any, body: {
        nome: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    update(req: any, id: string, body: {
        nome?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
}
