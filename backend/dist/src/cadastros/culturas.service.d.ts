import { PrismaService } from '../prisma/prisma.service';
export declare class CulturasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__CulturaClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        variedade: string | null;
        cicloDias: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        variedade: string | null;
        cicloDias: number | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__CulturaClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        variedade: string | null;
        cicloDias: number | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__CulturaClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        variedade: string | null;
        cicloDias: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CulturaClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        variedade: string | null;
        cicloDias: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
