import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FazendasService } from './fazendas.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('fazendas')
export class FazendasController {
    constructor(private readonly fazendasService: FazendasService) { }

    @Post()
    create(@Body() createFazendaDto: Prisma.FazendaCreateInput) {
        return this.fazendasService.create(createFazendaDto);
    }

    @Get()
    findAll() {
        return this.fazendasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.fazendasService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFazendaDto: Prisma.FazendaUpdateInput) {
        return this.fazendasService.update(id, updateFazendaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.fazendasService.remove(id);
    }
}
