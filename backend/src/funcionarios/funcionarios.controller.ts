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
import { FuncionariosService } from './funcionarios.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) { }

  @Post()
  create(@Req() req: any, @Body() data: Prisma.FuncionarioCreateInput) {
    const empresaId = req.user?.empresaId;
    return this.funcionariosService.create(empresaId, data);
  }

  @Get()
  findAll(@Req() req: any) {
    const empresaId = req.user?.empresaId;
    return this.funcionariosService.findAll(empresaId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    const empresaId = req.user?.empresaId;
    return this.funcionariosService.findOne(id, empresaId);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() data: Prisma.FuncionarioUpdateInput,
  ) {
    const empresaId = req.user?.empresaId;
    return this.funcionariosService.update(id, data, empresaId);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    const empresaId = req.user?.empresaId;
    return this.funcionariosService.remove(id, empresaId);
  }
}
