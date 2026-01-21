import { Module } from '@nestjs/common';
import { CulturasController } from './culturas.controller';
import { CulturasService } from './culturas.service';
import { AtividadesModule } from './atividades.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CulturasController],
  providers: [CulturasService],
  imports: [AtividadesModule, PrismaModule],
  exports: [CulturasService],
})
export class CulturasModule { }
