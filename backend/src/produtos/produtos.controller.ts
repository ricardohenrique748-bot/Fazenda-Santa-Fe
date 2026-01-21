import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) { }

    @Post()
    create(@Body() data: Prisma.ProdutoCreateInput, @Req() req: any) {
        return this.produtosService.create({ ...data, empresaId: req.user.empresaId } as any);
    }

    @Get()
    findAll(@Req() req: any) {
        return this.produtosService.findAll(req.user.empresaId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: any) {
        return this.produtosService.findOne(id, req.user.empresaId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Prisma.ProdutoUpdateInput, @Req() req: any) {
        return this.produtosService.update(id, data, req.user.empresaId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        return this.produtosService.remove(id, req.user.empresaId);
    }
}
