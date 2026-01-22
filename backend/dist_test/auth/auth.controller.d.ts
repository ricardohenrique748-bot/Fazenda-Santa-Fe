import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            nome: any;
            email: any;
            empresaId: any;
        };
    }>;
    register(registerDto: any): Promise<any>;
    seedRicardo(): Promise<any>;
}
