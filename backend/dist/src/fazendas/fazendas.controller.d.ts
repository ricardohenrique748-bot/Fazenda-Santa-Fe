import { FazendasService } from './fazendas.service';
import { Prisma } from '@prisma/client';
export declare class FazendasController {
    private readonly fazendasService;
    constructor(fazendasService: FazendasService);
    create(createFazendaDto: Prisma.FazendaCreateInput): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        cidade: string | null;
        estado: string | null;
        areaProdutiva: number | null;
        areaTotal: number | null;
        codigo: string | null;
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
        cidade: string | null;
        estado: string | null;
        areaProdutiva: number | null;
        areaTotal: number | null;
        codigo: string | null;
    })[]>;
    findOne(id: string): Promise<({
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
        cidade: string | null;
        estado: string | null;
        areaProdutiva: number | null;
        areaTotal: number | null;
        codigo: string | null;
    }) | null>;
    update(id: string, updateFazendaDto: Prisma.FazendaUpdateInput): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        cidade: string | null;
        estado: string | null;
        areaProdutiva: number | null;
        areaTotal: number | null;
        codigo: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        nome: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        cidade: string | null;
        estado: string | null;
        areaProdutiva: number | null;
        areaTotal: number | null;
        codigo: string | null;
    }>;
}
