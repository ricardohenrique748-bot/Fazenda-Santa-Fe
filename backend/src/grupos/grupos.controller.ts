import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('grupos')
@UseGuards(JwtAuthGuard)
export class GruposController {
    constructor(private readonly gruposService: GruposService) { }

    @Post()
    create(@Request() req: any, @Body() body: { nome: string; descricao?: string }) {
        return this.gruposService.create({ ...body, empresaId: req.user.empresaId });
    }

    @Get()
    findAll(@Request() req: any) {
        return this.gruposService.findAll(req.user.empresaId);
    }

    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        return this.gruposService.findOne(id, req.user.empresaId);
    }

    @Patch(':id')
    update(@Request() req: any, @Param('id') id: string, @Body() body: { nome?: string; descricao?: string }) {
        return this.gruposService.update(id, req.user.empresaId, body);
    }

    @Delete(':id')
    remove(@Request() req: any, @Param('id') id: string) {
        return this.gruposService.remove(id, req.user.empresaId);
    }
}
