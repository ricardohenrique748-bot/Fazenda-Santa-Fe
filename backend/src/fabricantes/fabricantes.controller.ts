import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FabricantesService } from './fabricantes.service';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@Controller('fabricantes')
@UseGuards(JwtAuthGuard)
export class FabricantesController {
    constructor(private readonly fabricantesService: FabricantesService) { }

    @Post()
    create(@Request() req: any, @Body() body: { nome: string }) {
        return this.fabricantesService.create({ ...body, empresaId: req.user.empresaId });
    }

    @Get()
    findAll(@Request() req: any) {
        return this.fabricantesService.findAll(req.user.empresaId);
    }

    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        return this.fabricantesService.findOne(id, req.user.empresaId);
    }

    @Patch(':id')
    update(@Request() req: any, @Param('id') id: string, @Body() body: { nome?: string }) {
        return this.fabricantesService.update(id, req.user.empresaId, body);
    }

    @Delete(':id')
    remove(@Request() req: any, @Param('id') id: string) {
        return this.fabricantesService.remove(id, req.user.empresaId);
    }
}
