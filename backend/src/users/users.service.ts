import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string): Promise<Usuario | null> {
        try {
            return await this.prisma.usuario.findUnique({
                where: { email },
                include: { empresa: true },
            });
        } catch (error) {
            // Fallback for Render environment if Prisma Client binary is mismatched
            console.error('Prisma findUnique failed, attempting raw query fallback:', error);
            const result: any[] = await this.prisma.$queryRaw`
                SELECT u.*, 
                       json_build_object(
                           'id', e.id, 
                           'razaoSocial', e."razaoSocial", 
                           'cnpj', e.cnpj,
                           'ativo', e.ativo
                       ) as empresa
                FROM "Usuario" u
                LEFT JOIN "Empresa" e ON u."empresaId" = e.id
                WHERE u.email = ${email}
                LIMIT 1
            `;

            if (result && result.length > 0) {
                // Raw query returns plain objects, need to map if necessary but mostly compatible
                return result[0] as Usuario;
            }
            return null;
        }
    }

    async findOneById(id: string): Promise<Usuario | null> {
        try {
            return await this.prisma.usuario.findUnique({
                where: { id },
                include: { empresa: true },
            });
        } catch (error) {
            console.error('Prisma findUnique (ID) failed, attempting raw query fallback:', error);
            const result: any[] = await this.prisma.$queryRaw`
                SELECT u.*, 
                       json_build_object(
                           'id', e.id, 
                           'razaoSocial', e."razaoSocial", 
                           'cnpj', e.cnpj,
                           'ativo', e.ativo
                       ) as empresa
                FROM "Usuario" u
                LEFT JOIN "Empresa" e ON u."empresaId" = e.id
                WHERE u.id = ${id}
                LIMIT 1
            `;

            if (result && result.length > 0) {
                return result[0] as Usuario;
            }
            return null;
        }
    }

    async findAll() {
        return this.prisma.usuario.findMany({
            include: { empresa: { select: { razaoSocial: true, nomeFantasia: true } } }
        });
    }

    async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
        const existing = await this.findOne(data.email);
        if (existing) {
            throw new BadRequestException('Email já cadastrado.');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.senha, salt);
        return this.prisma.usuario.create({
            data: {
                ...data,
                senha: hashedPassword,
            },
        });
    }

    async update(id: string, data: Prisma.UsuarioUpdateInput): Promise<Usuario> {
        if (data.senha && typeof data.senha === 'string') {
            const salt = await bcrypt.genSalt();
            data.senha = await bcrypt.hash(data.senha, salt);
        } else {
            delete data.senha; // Don't update if empty or invalid
        }

        return this.prisma.usuario.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.usuario.delete({ where: { id } });
    }
}
