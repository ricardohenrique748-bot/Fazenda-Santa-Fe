import { PrismaService } from '../prisma/prisma.service';
export declare class FabricantesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        nome: string;
        empresaId: string;
    }): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(empresaId: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string, empresaId: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, empresaId: string, data: {
        nome?: string;
    }): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, empresaId: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
