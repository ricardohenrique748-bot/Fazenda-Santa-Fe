import { Module } from '@nestjs/common';
import { UnidadesNegocioController } from './unidades-negocio.controller';
import { UnidadesNegocioService } from './unidades-negocio.service';
import { LocalizacoesModule } from './localizacoes.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UnidadesNegocioController],
  providers: [UnidadesNegocioService],
  imports: [LocalizacoesModule, PrismaModule],
  exports: [UnidadesNegocioService],
})
export class UnidadesNegocioModule { }
