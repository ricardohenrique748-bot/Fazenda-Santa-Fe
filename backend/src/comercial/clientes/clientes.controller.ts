import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('comercial/clientes')
@UseGuards(JwtAuthGuard)
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) { }

    @Post()
    create(@Body() data: Prisma.ClienteCreateInput, @Request() req: any) {
        // Force empresaId from user
        return this.clientesService.create({
            ...data,
            empresa: { connect: { id: req.user.empresaId } }
        });
    }

    @Get()
    findAll(@Request() req: any) {
        return this.clientesService.findAll(req.user.empresaId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Prisma.ClienteUpdateInput) {
        return this.clientesService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientesService.remove(id);
    }
}
