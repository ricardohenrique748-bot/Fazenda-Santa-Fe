import { Module } from '@nestjs/common';
import { LocalizacoesController } from './localizacoes.controller';
import { LocalizacoesService } from './localizacoes.service';
import { MunicipiosModule } from './municipios.module';
import { CulturasModule } from './culturas.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [LocalizacoesController],
  providers: [LocalizacoesService],
  imports: [MunicipiosModule, CulturasModule, PrismaModule],
  exports: [LocalizacoesService],
})
export class LocalizacoesModule { }
