import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ApontamentosService } from './apontamentos.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('apontamentos')
export class ApontamentosController {
    constructor(private readonly apontamentosService: ApontamentosService) { }

    @Post()
    create(@Req() req: any, @Body() data: Prisma.ApontamentoCreateInput) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada no token.');
        return this.apontamentosService.create(empresaId, data);
    }

    @Get()
    findAll(@Req() req: any) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada no token.');
        return this.apontamentosService.findAll(empresaId);
    }

    @Get(':id')
    findOne(@Req() req: any, @Param('id') id: string) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada no token.');
        return this.apontamentosService.findOne(empresaId, id);
    }

    @Patch(':id')
    update(@Req() req: any, @Param('id') id: string, @Body() data: Prisma.ApontamentoUpdateInput) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada no token.');
        return this.apontamentosService.update(empresaId, id, data);
    }

    @Delete(':id')
    remove(@Req() req: any, @Param('id') id: string) {
        const empresaId = req.user?.empresaId;
        if (!empresaId) throw new UnauthorizedException('Empresa não identificada no token.');
        return this.apontamentosService.remove(empresaId, id);
    }
}
