import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { CulturasService } from './culturas.service';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('culturas')
export class CulturasController {
  constructor(private readonly service: CulturasService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    if (!req.user?.empresaId) {
      console.error(
        'ERRO: Usuário sem empresaId no token ao tentar criar cultura',
      );
      throw new BadRequestException('Usuário sem empresa vinculada.');
    }
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
