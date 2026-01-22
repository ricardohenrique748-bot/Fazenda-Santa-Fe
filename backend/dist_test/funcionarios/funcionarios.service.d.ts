import { PrismaService } from '../prisma/prisma.service';
import { Funcionario, Prisma } from '@prisma/client';
export declare class FuncionariosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(empresaId: string, data: Prisma.FuncionarioCreateInput): Promise<Funcionario>;
    findAll(empresaId: string): Promise<({
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
    findOne(empresaId: string, id: string): Promise<Funcionario | null>;
    update(empresaId: string, id: string, data: Prisma.FuncionarioUpdateInput): Promise<Funcionario>;
    remove(empresaId: string, id: string): Promise<Funcionario>;
}
