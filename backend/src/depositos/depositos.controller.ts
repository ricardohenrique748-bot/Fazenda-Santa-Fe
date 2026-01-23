import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DepositosService } from './depositos.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('depositos')
export class DepositosController {
    constructor(private readonly depositosService: DepositosService) { }

    @Post()
    create(@Body() data: Prisma.DepositoCreateInput, @Req() req: any) {
        return this.depositosService.create({
            ...data,
            empresa: { connect: { id: req.user.empresaId } }
        } as any);
    }

    @Get()
    findAll(@Req() req: any) {
        return this.depositosService.findAll(req.user.empresaId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: any) {
        return this.depositosService.findOne(id, req.user.empresaId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Prisma.DepositoUpdateInput, @Req() req: any) {
        return this.depositosService.update(id, data, req.user.empresaId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        return this.depositosService.remove(id, req.user.empresaId);
    }
}
