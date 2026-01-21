import { Controller, Get, UseGuards } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('relatorios')
@UseGuards(JwtAuthGuard)
export class RelatoriosController {
    constructor(private readonly relatoriosService: RelatoriosService) { }

    @Get('dashboard-geral')
    getDashboardGeral() {
        return this.relatoriosService.getDashboardGeral();
    }

    @Get('custo-cultura')
    getCustoPorCultura() {
        return this.relatoriosService.getCustoPorCultura();
    }
}
