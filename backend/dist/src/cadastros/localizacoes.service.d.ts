import { PrismaService } from '../prisma/prisma.service';
export declare class LocalizacoesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__LocalizacaoClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
        fazendaId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        fazenda: {
            id: string;
            nome: string;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            codigo: string | null;
            cidade: string | null;
            estado: string | null;
            areaProdutiva: number | null;
            areaTotal: number | null;
        };
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
        fazendaId: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__LocalizacaoClient<({
        fazenda: {
            id: string;
            nome: string;
            empresaId: string;
            createdAt: Date;
            updatedAt: Date;
            codigo: string | null;
            cidade: string | null;
            estado: string | null;
            areaProdutiva: number | null;
            areaTotal: number | null;
        };
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
        fazendaId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__LocalizacaoClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
        fazendaId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__LocalizacaoClient<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
        fazendaId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
