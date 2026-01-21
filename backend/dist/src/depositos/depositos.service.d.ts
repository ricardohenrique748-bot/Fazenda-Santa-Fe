import { PrismaService } from '../prisma/prisma.service';
import { Deposito, Prisma } from '@prisma/client';
export declare class DepositosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.DepositoCreateInput): Promise<Deposito>;
    findAll(empresaId: string): Promise<({
        empresa: {
            razaoSocial: string;
        };
    } & {
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        localizacao: string | null;
    })[]>;
    findOne(id: string, empresaId: string): Promise<{
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
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        localizacao: string | null;
    }>;
    update(id: string, data: Prisma.DepositoUpdateInput, empresaId: string): Promise<Deposito>;
    remove(id: string, empresaId: string): Promise<Deposito>;
}
