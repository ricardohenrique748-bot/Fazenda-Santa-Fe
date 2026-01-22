import { PrismaService } from '../prisma/prisma.service';
import { Usuario, Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<Usuario | null>;
    findOneById(id: string): Promise<Usuario | null>;
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
        email: string;
        cargo: string | null;
        ativo: boolean;
        empresaId: string;
        senha: string;
        role: import(".prisma/client").$Enums.Role;
    })[]>;
    create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
    update(id: string, data: Prisma.UsuarioUpdateInput): Promise<Usuario>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nome: string;
        email: string;
        cargo: string | null;
        ativo: boolean;
        empresaId: string;
        senha: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
