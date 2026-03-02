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
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(`DEBUG: Validating user email="${email}" pass="${pass}"`);
    try {
      const user = await this.usersService.findOne(email);
      if (!user) {
        console.log(`DEBUG: User not found for email="${email}"`);
        return null;
      }

      console.log(`DEBUG: User found: ${user.email}, comparing password...`);
      if (!user.senha) {
        console.error('DEBUG: User has no password in DB');
        return null;
      }

      const isMatch = await bcrypt.compare(pass, user.senha);
      console.log(`DEBUG: Password match result: ${isMatch}`);

      if (user && isMatch) {
        const { senha, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('DEBUG: Error in validateUser:', error);
      return null;
    }
  }

  async login(user: any) {
    const empresaId = user.empresaId || user.empresa?.id;

    const payload = {
      email: user.email,
      sub: user.id,
      empresaId: empresaId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        empresaId: empresaId,
      },
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
