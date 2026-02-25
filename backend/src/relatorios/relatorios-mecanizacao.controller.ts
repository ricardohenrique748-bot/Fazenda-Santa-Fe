import {
  Controller,
  Get,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { RelatoriosMecanizacaoService } from './relatorios-mecanizacao.service';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('relatorios/mecanizacao')
export class RelatoriosMecanizacaoController {
  constructor(
    private readonly relatoriosService: RelatoriosMecanizacaoService,
  ) { }

  @Get('dashboard')
  async getDashboard(@Req() req: any) {
    const empresaId = req.user?.empresaId;
    if (!empresaId)
      throw new ForbiddenException('Sua conta não possui uma empresa vinculada.');
    return this.relatoriosService.getDashboardData(empresaId);
  }
}
