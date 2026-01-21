import { Module } from '@nestjs/common';
import { GruposEquipamentoService } from './grupos-equipamento.service';
import { GruposEquipamentoController } from './grupos-equipamento.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [GruposEquipamentoController],
    providers: [GruposEquipamentoService],
    exports: [GruposEquipamentoService]
})
export class GruposEquipamentoModule { }
