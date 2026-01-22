import { LocalizacoesService } from './localizacoes.service';
export declare class LocalizacoesController {
    private readonly service;
    constructor(service: LocalizacoesService);
    create(data: any): import(".prisma/client").Prisma.Prisma__LocalizacaoClient<{
        id: string;
        descricao: string | null;
        fazendaId: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        fazenda: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            nome: string;
            empresaId: string;
            areaProdutiva: number | null;
            areaTotal: number | null;
            cidade: string | null;
            codigo: string | null;
            estado: string | null;
        };
    } & {
        id: string;
        descricao: string | null;
        fazendaId: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__LocalizacaoClient<({
        fazenda: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            nome: string;
            empresaId: string;
            areaProdutiva: number | null;
            areaTotal: number | null;
            cidade: string | null;
            codigo: string | null;
            estado: string | null;
        };
    } & {
        id: string;
        descricao: string | null;
        fazendaId: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import(".prisma/client").Prisma.Prisma__LocalizacaoClient<{
        id: string;
        descricao: string | null;
        fazendaId: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__LocalizacaoClient<{
        id: string;
        descricao: string | null;
        fazendaId: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
