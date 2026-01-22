import { FuncionariosService } from './funcionarios.service';
import { Prisma } from '@prisma/client';
export declare class FuncionariosController {
    private readonly funcionariosService;
    constructor(funcionariosService: FuncionariosService);
    create(req: any, data: Prisma.FuncionarioCreateInput): Promise<{
        id: string;
        nome: string;
        email: string | null;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        cargo: string;
        cpf: string;
        telefone: string | null;
        dataAdmissao: Date;
        salario: number | null;
    }>;
    findAll(req: any): Promise<({
        empresa: {
            razaoSocial: string;
        };
    } & {
        id: string;
        nome: string;
        email: string | null;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        cargo: string;
        cpf: string;
        telefone: string | null;
        dataAdmissao: Date;
        salario: number | null;
    })[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        nome: string;
        email: string | null;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        cargo: string;
        cpf: string;
        telefone: string | null;
        dataAdmissao: Date;
        salario: number | null;
    } | null>;
    update(req: any, id: string, data: Prisma.FuncionarioUpdateInput): Promise<{
        id: string;
        nome: string;
        email: string | null;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        cargo: string;
        cpf: string;
        telefone: string | null;
        dataAdmissao: Date;
        salario: number | null;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        nome: string;
        email: string | null;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        cargo: string;
        cpf: string;
        telefone: string | null;
        dataAdmissao: Date;
        salario: number | null;
    }>;
}
