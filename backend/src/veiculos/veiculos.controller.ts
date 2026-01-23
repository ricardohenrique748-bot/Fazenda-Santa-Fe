import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('veiculos')
export class VeiculosController {
    constructor(private readonly veiculosService: VeiculosService) { }

    @Post()
    create(@Req() req: any, @Body() data: Prisma.VeiculoCreateInput) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada.');
        return this.veiculosService.create(empresaId, data);
    }

    @Get()
    findAll(@Req() req: any) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada.');
        return this.veiculosService.findAll(empresaId);
    }

    @Get(':id')
    findOne(@Req() req: any, @Param('id') id: string) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada.');
        return this.veiculosService.findOne(empresaId, id);
    }

    @Patch(':id')
    update(@Req() req: any, @Param('id') id: string, @Body() data: Prisma.VeiculoUpdateInput) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada.');
        return this.veiculosService.update(empresaId, id, data);
    }

    @Delete(':id')
    remove(@Req() req: any, @Param('id') id: string) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada.');
        return this.veiculosService.remove(empresaId, id);
    }
}
