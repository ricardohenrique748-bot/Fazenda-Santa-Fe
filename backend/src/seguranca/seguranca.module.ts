import { Module } from '@nestjs/common';
import { SegurancaService } from './seguranca.service';
import { SegurancaController } from './seguranca.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [SegurancaService],
    controllers: [SegurancaController],
})
export class SegurancaModule { }
