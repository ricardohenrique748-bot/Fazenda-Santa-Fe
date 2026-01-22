import { MunicipiosService } from './municipios.service';
export declare class MunicipiosController {
    private readonly service;
    constructor(service: MunicipiosService);
    create(data: any): import("@prisma/client").Prisma.Prisma__MunicipioClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        estado: string;
        codigoIbge: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        estado: string;
        codigoIbge: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__MunicipioClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        estado: string;
        codigoIbge: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__MunicipioClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        estado: string;
        codigoIbge: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__MunicipioClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        estado: string;
        codigoIbge: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
