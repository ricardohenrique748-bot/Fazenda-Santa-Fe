import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('estoque')
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) { }

    @Post('movimentacoes')
    create(@Body() data: any, @Req() req: any) {
        // Pegar o usuário logado do JWT
        const usuarioId = req.user.userId;
        const empresaId = req.user.empresaId;
        return this.estoqueService.createMovimentacao({ ...data, usuarioId, empresaId });
    }

    @Post('transferencias')
    transferir(@Body() data: any, @Req() req: any) {
        const usuarioId = req.user.userId;
        const empresaId = req.user.empresaId;
        return this.estoqueService.transferirProduto({ ...data, usuarioId, empresaId });
    }

    @Post('conferencia')
    conferencia(@Body() data: any, @Req() req: any) {
        const usuarioId = req.user.userId;
        const empresaId = req.user.empresaId;
        return this.estoqueService.processarConferencia({ ...data, usuarioId, empresaId });
    }

    @Get('movimentacoes')
    findAllMovimentacoes(@Req() req: any) {
        return this.estoqueService.findAllMovimentacoes(req.user.empresaId);
    }

    @Get('saldos')
    getSaldos(@Req() req: any) {
        return this.estoqueService.getSaldos(req.user.empresaId);
    }
}
