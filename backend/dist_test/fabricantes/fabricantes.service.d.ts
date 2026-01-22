import { PrismaService } from '../prisma/prisma.service';
export declare class FabricantesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        nome: string;
        empresaId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    findAll(empresaId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }[]>;
    findOne(id: string, empresaId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    update(id: string, empresaId: string, data: {
        nome?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    remove(id: string, empresaId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
}
