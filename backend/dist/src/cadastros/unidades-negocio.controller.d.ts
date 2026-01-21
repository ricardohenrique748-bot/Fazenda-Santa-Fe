import { UnidadesNegocioService } from './unidades-negocio.service';
export declare class UnidadesNegocioController {
    private readonly service;
    constructor(service: UnidadesNegocioService);
    create(data: any): import("@prisma/client").Prisma.Prisma__UnidadeNegocioClient<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        empresa: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            cnpj: string;
            bairro: string | null;
            cep: string | null;
            cidade: string | null;
            complemento: string | null;
            estado: string | null;
            inscricaoEstadual: string | null;
            logradouro: string | null;
            nomeFantasia: string | null;
            numero: string | null;
            razaoSocial: string;
            site: string | null;
            telefone: string | null;
        };
    } & {
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__UnidadeNegocioClient<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__UnidadeNegocioClient<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__UnidadeNegocioClient<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
