import { Module } from '@nestjs/common';
import { PedidosVendaService } from './pedidos-venda.service';
import { PedidosVendaController } from './pedidos-venda.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PedidosVendaController],
    providers: [PedidosVendaService],
    exports: [PedidosVendaService],
})
export class PedidosVendaModule { }
