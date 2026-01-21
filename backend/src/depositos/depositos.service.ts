import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Deposito, Prisma } from '@prisma/client';

@Injectable()
export class DepositosService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.DepositoCreateInput): Promise<Deposito> {
        return this.prisma.deposito.create({ data });
    }

    async findAll(empresaId: string) {
        return this.prisma.deposito.findMany({
            where: { empresaId },
            include: {
                empresa: { select: { razaoSocial: true } }
            }
        });
    }

    async findOne(id: string, empresaId: string) {
        const deposito = await this.prisma.deposito.findFirst({
            where: { id, empresaId },
            include: {
                empresa: true,
                estoques: {
                    include: { produto: true }
                }
            }
        });
        if (!deposito) throw new Error('Depósito não encontrado'); // Using standard Error or BadRequestException
        return deposito;
    }

    async update(id: string, data: Prisma.DepositoUpdateInput, empresaId: string): Promise<Deposito> {
        await this.findOne(id, empresaId);
        return this.prisma.deposito.update({
            where: { id },
            data,
        });
    }

    async remove(id: string, empresaId: string): Promise<Deposito> {
        await this.findOne(id, empresaId);
        return this.prisma.deposito.delete({
            where: { id },
        });
    }
}
