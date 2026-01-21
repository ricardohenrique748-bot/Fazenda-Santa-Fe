import { Module } from '@nestjs/common';
import { PlanejamentoService } from './planejamento.service';
import { SafrasService } from './safras.service';
import { PlanejamentoController } from './planejamento.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PlanejamentoController],
    providers: [PlanejamentoService, SafrasService],
    exports: [PlanejamentoService, SafrasService],
})
export class PlanejamentoModule { }
