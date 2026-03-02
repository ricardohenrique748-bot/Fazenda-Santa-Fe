import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@Controller('notas-fiscais')
@UseGuards(JwtAuthGuard)
export class NotasFiscaisController {
  constructor(private readonly notasFiscaisService: NotasFiscaisService) {}

  @Post('importar')
  async importar(@Body() body: any, @Req() req: any) {
    return this.notasFiscaisService.importar({
      ...body,
      usuarioId: req.user.id,
    });
  }

  @Get()
  async findAll(@Query('empresaId') empresaId: string) {
    return this.notasFiscaisService.findAll(empresaId);
  }
}
