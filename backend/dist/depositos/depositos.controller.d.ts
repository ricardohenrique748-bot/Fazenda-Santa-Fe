import { DepositosService } from './depositos.service';
import { Prisma } from '@prisma/client';
export declare class DepositosController {
    private readonly depositosService;
    constructor(depositosService: DepositosService);
    create(data: Prisma.DepositoCreateInput, req: any): Promise<{
        localizacao: string | null;
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(req: any): Promise<({
        empresa: {
            razaoSocial: string;
        };
    } & {
        localizacao: string | null;
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string, req: any): Promise<{
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
        estoques: ({
            produto: {
                id: string;
                nome: string;
                empresaId: string;
                createdAt: Date;
                updatedAt: Date;
                codigo: string | null;
                grupoId: string | null;
                unidadeMedida: string;
                categoria: string | null;
                fabricanteId: string | null;
            };
        } & {
            id: string;
            quantidade: number;
            produtoId: string;
            depositoId: string;
        })[];
    } & {
        localizacao: string | null;
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: Prisma.DepositoUpdateInput, req: any): Promise<{
        localizacao: string | null;
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, req: any): Promise<{
        localizacao: string | null;
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
