import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('compras')
@UseGuards(JwtAuthGuard)
export class ComprasController {
    constructor(private readonly comprasService: ComprasService) { }

    @Get('fornecedores')
    getFornecedores(@Request() req: any) {
        return this.comprasService.getFornecedores(req.user.empresaId);
    }

    @Post('fornecedores')
    createFornecedor(@Body() data: any, @Request() req: any) {
        return this.comprasService.createFornecedor(data, req.user.empresaId);
    }

    @Get('pedidos')
    getPedidos(@Request() req: any) {
        return this.comprasService.getPedidos(req.user.empresaId);
    }

    @Post('pedidos')
    createPedido(@Body() data: any, @Request() req: any) {
        return this.comprasService.createPedido(data, req.user.empresaId);
    }

    @Get('contratos')
    getContratos(@Request() req: any) {
        // Leaving Contratos unscoped for now if not requested, but better safe.
        // Assuming Contracts also need check? Schema: ContratoComercial has NO empresaId in snippet I saw?
        // Let's check schema snippet again... 
        // Line 347: model ContratoComercial...
        // Line 350: clienteId...
        // It has clienteRel -> Cliente -> Empresa.
        // So it is scoped. I'll scope it too.
        return this.comprasService.getContratos(req.user.empresaId);
    }

    @Post('contratos')
    createContrato(@Body() data: any, @Request() req: any) {
        return this.comprasService.createContrato(data); // Create might need handling.
    }
}
