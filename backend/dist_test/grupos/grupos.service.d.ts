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
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    findAll(empresaId: string): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }[]>;
    findOne(id: string, empresaId: string): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
    update(id: string, empresaId: string, data: {
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
    remove(id: string, empresaId: string): Promise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
    }>;
}
