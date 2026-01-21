import { Module } from '@nestjs/common';
import { DepositosService } from './depositos.service';
import { DepositosController } from './depositos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [DepositosController],
    providers: [DepositosService],
    exports: [DepositosService],
})
export class DepositosModule { }
