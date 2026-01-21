import { Module } from '@nestjs/common';
import { ApontamentosService } from './apontamentos.service';
import { ApontamentosController } from './apontamentos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ApontamentosController],
    providers: [ApontamentosService],
})
export class ApontamentosModule { }
