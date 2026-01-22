import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUsuarioDto: Prisma.UsuarioCreateInput): Promise<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        cargo: string | null;
        role: import("@prisma/client").$Enums.Role;
    }>;
    findAll(): Promise<({
        empresa: {
            nomeFantasia: string | null;
            razaoSocial: string;
        };
    } & {
        id: string;
        nome: string;
        email: string;
        senha: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        cargo: string | null;
        role: import("@prisma/client").$Enums.Role;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        cargo: string | null;
        role: import("@prisma/client").$Enums.Role;
    } | null>;
    update(id: string, updateUsuarioDto: Prisma.UsuarioUpdateInput): Promise<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        cargo: string | null;
        role: import("@prisma/client").$Enums.Role;
    }>;
    remove(id: string): Promise<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        empresaId: string;
        createdAt: Date;
        updatedAt: Date;
        ativo: boolean;
        cargo: string | null;
        role: import("@prisma/client").$Enums.Role;
    }>;
}
