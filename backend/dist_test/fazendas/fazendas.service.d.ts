import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class FazendasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.FazendaCreateInput): Promise<{
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
    }>;
    findAll(): Promise<({
        empresa: {
            nomeFantasia: string | null;
            razaoSocial: string;
        };
    } & {
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
    })[]>;
    findOne(id: string): Promise<({
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
        areaProdutiva: number | null;
        areaTotal: number | null;
        cidade: string | null;
        codigo: string | null;
        estado: string | null;
    }) | null>;
    update(id: string, data: Prisma.FazendaUpdateInput): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
