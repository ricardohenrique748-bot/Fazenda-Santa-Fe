import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        try {
            console.log('AuthController.login called');
            return await this.authService.login(req.user);
        } catch (error) {
            console.error('AuthController.login error:', error);
            throw error;
        }
    }

    @Post('register')
    async register(@Body() registerDto: any) {
        return this.authService.register(registerDto);
    }

    @Post('seed-ricardo')
    async seedRicardo() {
        return this.authService.register({
            email: 'ricardo.luz@eunaman.com.br',
            senha: '85245655',
            nome: 'Ricardo Luz',
            nomeEmpresa: 'Malut Soluções',
            cnpj: '00.000.000/0001-00'
        });
    }

    @Post('debug-login')
    async debugLogin(@Body() body: any) {
        try {
            console.log('Debug login for:', body.email);
            const user = await this.authService.validateUser(body.email, body.senha);
            if (!user) {
                return { status: 'error', message: 'User not found or password incorrect' };
            }
            return { status: 'success', user, token: await this.authService.login(user) };
        } catch (error: any) {
            return {
                status: 'error',
                message: error.message,
                stack: error.stack
            };
        }
    }
}
