import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PedidosVendaService } from './pedidos-venda.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('comercial/pedidos-venda')
@UseGuards(JwtAuthGuard)
export class PedidosVendaController {
    constructor(private readonly pedidosService: PedidosVendaService) { }

    @Post()
    create(@Body() data: any, @Request() req: any) {
        return this.pedidosService.create({
            ...data,
            empresaId: req.user.empresaId,
            empresa: undefined // Ensure we don't pass object if using ID
        });
    }

    @Get()
    findAll(@Request() req: any) {
        return this.pedidosService.findAll(req.user.empresaId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pedidosService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.pedidosService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pedidosService.remove(id);
    }
}
