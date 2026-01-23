import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && (await bcrypt.compare(pass, user.senha))) {
            const { senha, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        console.log('DEBUG: AuthService.login called with user:', user);
        const payload = { email: user.email, sub: user.id, empresaId: user.empresaId };
        console.log('DEBUG: Generated JWT payload:', payload);
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                empresaId: user.empresaId,
            }
        };
    }

    async register(data: any) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.senha, salt);

        return (this.prisma as any).$transaction(async (prisma: any) => {
            const empresa = await prisma.empresa.create({
                data: {
                    razaoSocial: data.nomeEmpresa,
                    cnpj: data.cnpj,
                },
            });

            const user = await prisma.usuario.create({
                data: {
                    nome: data.nome,
                    email: data.email,
                    senha: hashedPassword,
                    empresaId: empresa.id,
                },
            });

            return this.login(user);
        });
    }
}
