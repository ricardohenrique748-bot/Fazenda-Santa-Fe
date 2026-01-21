import { PrismaService } from '../prisma/prisma.service';
export declare class GruposService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        nome: string;
        descricao?: string;
        empresaId: string;
    }): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }>;
    findAll(empresaId: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }[]>;
    findOne(id: string, empresaId: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }>;
    update(id: string, empresaId: string, data: {
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
    remove(id: string, empresaId: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }>;
}
