import { PrismaService } from '../prisma/prisma.service';
export declare class AtividadesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import(".prisma/client").Prisma.Prisma__AtividadeClient<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__AtividadeClient<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import(".prisma/client").Prisma.Prisma__AtividadeClient<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__AtividadeClient<{
        id: string;
        descricao: string | null;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
