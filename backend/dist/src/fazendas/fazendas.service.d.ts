import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class FazendasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.FazendaCreateInput): Promise<{
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
    }>;
    findAll(): Promise<({
        empresa: {
            nomeFantasia: string | null;
            razaoSocial: string;
        };
    } & {
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
    })[]>;
    findOne(id: string): Promise<({
        empresa: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            ativo: boolean;
            cnpj: string | null;
            cpf: string | null;
            codigo: string | null;
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
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string | null;
        cidade: string | null;
        estado: string | null;
        areaProdutiva: number | null;
        areaTotal: number | null;
    }) | null>;
    update(id: string, data: Prisma.FazendaUpdateInput): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
