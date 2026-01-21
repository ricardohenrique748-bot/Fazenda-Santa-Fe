import { Module } from '@nestjs/common';
import { MunicipiosController } from './municipios.controller';
import { MunicipiosService } from './municipios.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    controllers: [MunicipiosController],
    providers: [MunicipiosService],
    imports: [PrismaModule],
    exports: [MunicipiosService],
})
export class MunicipiosModule { }
