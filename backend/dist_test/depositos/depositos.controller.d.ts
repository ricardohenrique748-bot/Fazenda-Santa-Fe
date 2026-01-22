import { DepositosService } from './depositos.service';
import { Prisma } from '@prisma/client';
export declare class DepositosController {
    private readonly depositosService;
    constructor(depositosService: DepositosService);
    create(data: Prisma.DepositoCreateInput, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
        localizacao: string | null;
    }>;
    findAll(req: any): Promise<({
        empresa: {
            razaoSocial: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
        localizacao: string | null;
    })[]>;
    findOne(id: string, req: any): Promise<{
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
        estoques: ({
            produto: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                nome: string;
                empresaId: string;
                codigo: string | null;
                unidadeMedida: string;
                categoria: string | null;
                grupoId: string | null;
                fabricanteId: string | null;
            };
        } & {
            id: string;
            quantidade: number;
            produtoId: string;
            depositoId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
        localizacao: string | null;
    }>;
    update(id: string, data: Prisma.DepositoUpdateInput, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
        localizacao: string | null;
    }>;
    remove(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        empresaId: string;
        localizacao: string | null;
    }>;
}
