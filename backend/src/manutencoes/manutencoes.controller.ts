import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ManutencoesService } from './manutencoes.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('manutencoes')
export class ManutencoesController {
    constructor(private readonly manutencoesService: ManutencoesService) { }

    @Post()
    create(@Req() req: any, @Body() data: Prisma.ManutencaoCreateInput) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada.');
        return this.manutencoesService.create(empresaId, data);
    }

    @Get()
    findAll(@Req() req: any) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada.');
        return this.manutencoesService.findAll(empresaId);
    }

    @Get(':id')
    findOne(@Req() req: any, @Param('id') id: string) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada.');
        return this.manutencoesService.findOne(empresaId, id);
    }

    @Patch(':id')
    update(@Req() req: any, @Param('id') id: string, @Body() data: Prisma.ManutencaoUpdateInput) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada.');
        return this.manutencoesService.update(empresaId, id, data);
    }

    @Delete(':id')
    remove(@Req() req: any, @Param('id') id: string) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada.');
        return this.manutencoesService.remove(empresaId, id);
    }
}
