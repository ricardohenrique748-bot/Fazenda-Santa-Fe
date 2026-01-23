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
            console.error('Prisma findUnique failed, attempting PG driver fallback:', error);
            // Fallback using direct 'pg' driver to bypass Prisma binary/engine issues completely
            const { Client } = require('pg');
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: { rejectUnauthorized: false }, // Required for Supabase/Render connections
            });

            try {
                await client.connect();
                // Fetch user
                const userRes = await client.query('SELECT * FROM "Usuario" WHERE "email" = $1 LIMIT 1', [email]);

                if (userRes.rows.length > 0) {
                    const user = userRes.rows[0];
                    // Fetch empresa if user exists (to satisfy the 'include: { empresa: true }' contract lightly)
                    // Note: We are strictly returning the user object here.
                    // If complex relations are needed critically, we would fetch them.
                    await client.end();
                    return user as Usuario;
                }
                await client.end();
                return null;
            } catch (pgError) {
                console.error('PG driver fallback also failed:', pgError);
                if (client) await client.end(); // Ensure connection is closed
                throw pgError; // Throw original or new error
            }
        }
    }

    async findOneById(id: string): Promise<Usuario | null> {
        try {
            return await this.prisma.usuario.findUnique({
                where: { id },
                include: { empresa: true },
            });
        } catch (error) {
            console.error('Prisma findUnique (ID) failed, attempting PG driver fallback:', error);
            const { Client } = require('pg');
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: { rejectUnauthorized: false },
            });

            try {
                await client.connect();
                const userRes = await client.query('SELECT * FROM "Usuario" WHERE "id" = $1 LIMIT 1', [id]);

                if (userRes.rows.length > 0) {
                    const user = userRes.rows[0];
                    await client.end();
                    return user as Usuario;
                }
                await client.end();
                return null;
            } catch (pgError) {
                console.error('PG driver fallback (ID) also failed:', pgError);
                if (client) await client.end();
                throw pgError;
            }
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
