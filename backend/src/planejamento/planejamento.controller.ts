import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { SafrasService } from './safras.service';
import { PlanejamentoService } from './planejamento.service';

@Controller('planejamento')
export class PlanejamentoController {
    constructor(
        private readonly safrasService: SafrasService,
        private readonly planejamentoService: PlanejamentoService,
    ) { }

    // Safras
    @Post('safras')
    createSafra(@Body() data: any) {
        return this.safrasService.create(data);
    }

    @Get('safras')
    findAllSafras() {
        return this.safrasService.findAll();
    }

    @Get('safras/:id')
    findOneSafra(@Param('id') id: string) {
        return this.safrasService.findOne(id);
    }

    @Put('safras/:id')
    updateSafra(@Param('id') id: string, @Body() data: any) {
        return this.safrasService.update(id, data);
    }

    @Delete('safras/:id')
    removeSafra(@Param('id') id: string) {
        return this.safrasService.remove(id);
    }

    // Planejamentos
    @Post()
    createPlanejamento(@Body() data: any) {
        return this.planejamentoService.create(data);
    }

    @Get()
    findAllPlanejamentos(
        @Query('safraId') safraId?: string,
        @Query('fazendaId') fazendaId?: string,
    ) {
        return this.planejamentoService.findAll({ safraId, fazendaId });
    }

    @Get('cronograma')
    getCronograma(
        @Query('start') start: string,
        @Query('end') end: string,
    ) {
        return this.planejamentoService.getCronograma(start, end);
    }

    @Get(':id')
    findOnePlanejamento(@Param('id') id: string) {
        return this.planejamentoService.findOne(id);
    }

    @Delete(':id')
    removePlanejamento(@Param('id') id: string) {
        return this.planejamentoService.remove(id);
    }
}
