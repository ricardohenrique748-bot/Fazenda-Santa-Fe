import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ManutencoesService } from './manutencoes.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('manutencoes')
export class ManutencoesController {
  constructor(private readonly manutencoesService: ManutencoesService) { }

  @Post()
  create(@Req() req: any, @Body() data: Prisma.ManutencaoCreateInput) {
    const empresaId = req.user?.empresaId;
    return this.manutencoesService.create(data, empresaId);
  }

  @Get()
  findAll(@Req() req: any) {
    const empresaId = req.user?.empresaId;
    return this.manutencoesService.findAll(empresaId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    const empresaId = req.user?.empresaId;
    return this.manutencoesService.findOne(id, empresaId);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() data: Prisma.ManutencaoUpdateInput,
  ) {
    const empresaId = req.user?.empresaId;
    return this.manutencoesService.update(id, data, empresaId);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    const empresaId = req.user?.empresaId;
    return this.manutencoesService.remove(id, empresaId);
  }
}
