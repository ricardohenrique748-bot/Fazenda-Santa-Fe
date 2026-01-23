import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Request, Delete } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('financeiro')
export class FinanceiroController {
    constructor(private readonly financeiroService: FinanceiroService) { }

    @Post('plano-contas')
    createPlanoContas(@Request() req: any, @Body() data: Prisma.PlanoContasCreateInput) {
        return this.financeiroService.createPlanoContas({
            ...data,
            empresa: { connect: { id: req.user.empresaId } }
        } as any);
    }

    @Get('plano-contas')
    findAllPlanoContas(@Request() req: any) {
        return this.financeiroService.findAllPlanoContas(req.user.empresaId);
    }

    @Patch('plano-contas/:id')
    updatePlanoContas(@Request() req: any, @Param('id') id: string, @Body() data: Prisma.PlanoContasUpdateInput) {
        return this.financeiroService.updatePlanoContas(id, req.user.empresaId, data);
    }

    @Delete('plano-contas/:id')
    removePlanoContas(@Request() req: any, @Param('id') id: string) {
        return this.financeiroService.removePlanoContas(id, req.user.empresaId);
    }

    @Post('lancamentos')
    createLancamento(@Body() data: any) {
        return this.financeiroService.createLancamento(data);
    }

    @Get('lancamentos')
    findAllLancamentos(@Query() filters: any) {
        return this.financeiroService.findAllLancamentos(filters);
    }

    @Patch('lancamentos/:id/baixar')
    baixar(@Param('id') id: string, @Body('dataPagamento') dataPagamento: string) {
        return this.financeiroService.baixarLancamento(id, dataPagamento);
    }

    @Get('fluxo-caixa')
    async getFluxoCaixa(@Request() req: any, @Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        return this.financeiroService.getFluxoCaixa(req.user.empresaId, startDate, endDate);
    }
}
