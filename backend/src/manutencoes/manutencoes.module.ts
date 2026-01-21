import { Module } from '@nestjs/common';
import { ManutencoesService } from './manutencoes.service';
import { ManutencoesController } from './manutencoes.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { VeiculosModule } from '../veiculos/veiculos.module';

@Module({
    imports: [PrismaModule, VeiculosModule],
    controllers: [ManutencoesController],
    providers: [ManutencoesService],
})
export class ManutencoesModule { }
