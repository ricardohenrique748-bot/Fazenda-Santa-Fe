import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { GruposEquipamentoService } from './grupos-equipamento.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('grupos-equipamento')
export class GruposEquipamentoController {
    constructor(private readonly gruposEquipamentoService: GruposEquipamentoService) { }

    @Post()
    create(@Req() req: any, @Body() data: Prisma.GrupoEquipamentoCreateInput) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada no token.');
        return this.gruposEquipamentoService.create(empresaId, data);
    }

    @Get()
    findAll(@Req() req: any) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada no token.');
        return this.gruposEquipamentoService.findAll(empresaId);
    }

    @Get(':id')
    findOne(@Req() req: any, @Param('id') id: string) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada no token.');
        return this.gruposEquipamentoService.findOne(empresaId, id);
    }

    @Patch(':id')
    update(@Req() req: any, @Param('id') id: string, @Body() data: Prisma.GrupoEquipamentoUpdateInput) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada no token.');
        return this.gruposEquipamentoService.update(empresaId, id, data);
    }

    @Delete(':id')
    remove(@Req() req: any, @Param('id') id: string) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada no token.');
        return this.gruposEquipamentoService.remove(empresaId, id);
    }
}
