import { Controller, Get, Post, Body, Query, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { SegurancaService } from './seguranca.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('seguranca')
@UseGuards(JwtAuthGuard)
export class SegurancaController {
    constructor(private readonly segurancaService: SegurancaService) { }

    @Get('epis')
    getEPIs() {
        return this.segurancaService.getEPIs();
    }

    @Post('epis')
    createEPI(@Body() data: any) {
        return this.segurancaService.createEPI(data);
    }

    @Get('epis/:id')
    getEPIById(@Param('id') id: string) {
        return this.segurancaService.getEPIById(id);
    }

    @Patch('epis/:id')
    updateEPI(@Param('id') id: string, @Body() data: any) {
        return this.segurancaService.updateEPI(id, data);
    }

    @Delete('epis/:id')
    deleteEPI(@Param('id') id: string) {
        return this.segurancaService.deleteEPI(id);
    }

    @Get('entregas')
    getEntregas(@Query('funcionarioId') funcionarioId?: string) {
        return this.segurancaService.getEntregas(funcionarioId);
    }

    @Post('entregas')
    createEntrega(@Body() data: any) {
        return this.segurancaService.createEntrega(data);
    }

    @Get('exames')
    getExames(@Query('funcionarioId') funcionarioId?: string) {
        return this.segurancaService.getExames(funcionarioId);
    }

    @Post('exames')
    createExame(@Body() data: any) {
        return this.segurancaService.createExame(data);
    }

    @Get('exames/:id')
    getExameById(@Param('id') id: string) {
        return this.segurancaService.getExameById(id);
    }

    @Patch('exames/:id')
    updateExame(@Param('id') id: string, @Body() data: any) {
        return this.segurancaService.updateExame(id, data);
    }

    @Delete('exames/:id')
    deleteExame(@Param('id') id: string) {
        return this.segurancaService.deleteExame(id);
    }
}
