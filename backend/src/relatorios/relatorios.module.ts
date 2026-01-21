import { Module } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { RelatoriosController } from './relatorios.controller';
import { RelatoriosMecanizacaoService } from './relatorios-mecanizacao.service';
import { RelatoriosMecanizacaoController } from './relatorios-mecanizacao.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [RelatoriosService, RelatoriosMecanizacaoService],
    controllers: [RelatoriosController, RelatoriosMecanizacaoController],
})
export class RelatoriosModule { }
