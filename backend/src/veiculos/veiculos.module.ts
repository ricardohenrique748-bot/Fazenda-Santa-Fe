import { Module } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { VeiculosController } from './veiculos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [VeiculosController],
    providers: [VeiculosService],
    exports: [VeiculosService],
})
export class VeiculosModule { }
