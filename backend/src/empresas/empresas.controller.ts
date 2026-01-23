import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('empresas')
export class EmpresasController {
    constructor(private readonly empresasService: EmpresasService) { }

    @Post()
    create(@Body() createEmpresaDto: Prisma.EmpresaCreateInput) {
        return this.empresasService.create(createEmpresaDto);
    }

    @Get()
    findAll() {
        return this.empresasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.empresasService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEmpresaDto: Prisma.EmpresaUpdateInput) {
        return this.empresasService.update(id, updateEmpresaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.empresasService.remove(id);
    }
}
