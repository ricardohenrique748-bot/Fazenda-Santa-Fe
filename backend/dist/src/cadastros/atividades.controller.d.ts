import { AtividadesService } from './atividades.service';
export declare class AtividadesController {
    private readonly service;
    constructor(service: AtividadesService);
    create(data: any): import("@prisma/client").Prisma.Prisma__AtividadeClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__AtividadeClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__AtividadeClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__AtividadeClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
