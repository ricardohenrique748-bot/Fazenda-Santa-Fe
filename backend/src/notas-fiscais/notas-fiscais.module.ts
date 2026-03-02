import { Module } from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';
import { NotasFiscaisController } from './notas-fiscais.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NotasFiscaisController],
  providers: [NotasFiscaisService],
  exports: [NotasFiscaisService],
})
export class NotasFiscaisModule {}
