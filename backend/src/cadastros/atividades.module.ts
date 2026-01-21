import { Module } from '@nestjs/common';
import { AtividadesController } from './atividades.controller';
import { AtividadesService } from './atividades.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AtividadesController],
  providers: [AtividadesService],
  imports: [PrismaModule],
  exports: [AtividadesService],
})
export class AtividadesModule { }
