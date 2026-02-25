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
import { ApontamentosService } from './apontamentos.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('apontamentos')
export class ApontamentosController {
  constructor(private readonly apontamentosService: ApontamentosService) { }

  @Post()
  create(@Req() req: any, @Body() data: Prisma.ApontamentoCreateInput) {
    const empresaId = req.user?.empresaId;
    return this.apontamentosService.create(empresaId, data);
  }

  @Get()
  findAll(@Req() req: any) {
    const empresaId = req.user?.empresaId;
    return this.apontamentosService.findAll(empresaId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    const empresaId = req.user?.empresaId;
    return this.apontamentosService.findOne(id, empresaId);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() data: Prisma.ApontamentoUpdateInput,
  ) {
    const empresaId = req.user?.empresaId;
    return this.apontamentosService.update(id, data, empresaId);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    const empresaId = req.user?.empresaId;
    return this.apontamentosService.remove(id, empresaId);
  }
}
