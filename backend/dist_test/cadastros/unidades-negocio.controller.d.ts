import { UnidadesNegocioService } from './unidades-negocio.service';
export declare class UnidadesNegocioController {
    private readonly service;
    constructor(service: UnidadesNegocioService);
    create(data: any): import(".prisma/client").Prisma.Prisma__UnidadeNegocioClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
        codigo: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        empresa: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            cpf: string | null;
            email: string | null;
            telefone: string | null;
            ativo: boolean;
            cidade: string | null;
            codigo: string | null;
            estado: string | null;
            cnpj: string | null;
            bairro: string | null;
            cep: string | null;
            complemento: string | null;
            inscricaoEstadual: string | null;
            logradouro: string | null;
            nomeFantasia: string | null;
            numero: string | null;
            razaoSocial: string;
            site: string | null;
            ignorarCaixaFinanceiro: boolean;
            ignorarEstoque: boolean;
            cfop: string | null;
            inscricaoMunicipal: string | null;
            cei: string | null;
            cnaeFiscal: string | null;
            correspondenciaLogradouro: string | null;
            correspondenciaNumero: string | null;
            correspondenciaBairro: string | null;
            correspondenciaEstado: string | null;
            correspondenciaCidade: string | null;
            correspondenciaCep: string | null;
            lotacaoTributaria: string | null;
            codigoFpas: string | null;
            codigoGps: string | null;
            outrasEntidades: string | null;
            codigoFap: string | null;
            codigoSimples: string | null;
            aliquotaRat: number | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
        codigo: string | null;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UnidadeNegocioClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
        codigo: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import(".prisma/client").Prisma.Prisma__UnidadeNegocioClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
        codigo: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UnidadeNegocioClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
        codigo: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
