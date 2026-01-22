import { FuncionariosService } from './funcionarios.service';
import { Prisma } from '@prisma/client';
export declare class FuncionariosController {
    private readonly funcionariosService;
    constructor(funcionariosService: FuncionariosService);
    create(req: any, data: Prisma.FuncionarioCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        cpf: string;
        email: string | null;
        telefone: string | null;
        cargo: string;
        dataAdmissao: Date;
        salario: number | null;
        ativo: boolean;
        empresaId: string;
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
        cpf: string;
        email: string | null;
        telefone: string | null;
        cargo: string;
        dataAdmissao: Date;
        salario: number | null;
        ativo: boolean;
        empresaId: string;
    })[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        cpf: string;
        email: string | null;
        telefone: string | null;
        cargo: string;
        dataAdmissao: Date;
        salario: number | null;
        ativo: boolean;
        empresaId: string;
    } | null>;
    update(req: any, id: string, data: Prisma.FuncionarioUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        cpf: string;
        email: string | null;
        telefone: string | null;
        cargo: string;
        dataAdmissao: Date;
        salario: number | null;
        ativo: boolean;
        empresaId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        cpf: string;
        email: string | null;
        telefone: string | null;
        cargo: string;
        dataAdmissao: Date;
        salario: number | null;
        ativo: boolean;
        empresaId: string;
    }>;
}
