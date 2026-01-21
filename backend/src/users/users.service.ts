import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string): Promise<Usuario | null> {
        return this.prisma.usuario.findUnique({
            where: { email },
            include: { empresa: true },
        });
    }

    async findOneById(id: string): Promise<Usuario | null> {
        return this.prisma.usuario.findUnique({
            where: { id },
            // Password should generally be excluded in a real app interceptor, but keeping simple for now
            include: { empresa: true },
        });
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
