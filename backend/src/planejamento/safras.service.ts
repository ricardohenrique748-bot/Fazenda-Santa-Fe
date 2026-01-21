import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Safra } from '@prisma/client';

@Injectable()
export class SafrasService {
    constructor(private prisma: PrismaService) { }

    async create(data: any): Promise<Safra> {
        return this.prisma.safra.create({
            data: {
                ...data,
                dataInicio: new Date(data.dataInicio),
                dataFim: new Date(data.dataFim),
            }
        });
    }

    async findAll(): Promise<Safra[]> {
        return this.prisma.safra.findMany({
            orderBy: { dataInicio: 'desc' },
            include: {
                _count: {
                    select: { planejamentos: true }
                }
            }
        });
    }

    async findOne(id: string): Promise<Safra | null> {
        return this.prisma.safra.findUnique({
            where: { id },
            include: { planejamentos: true }
        });
    }

    async update(id: string, data: any): Promise<Safra> {
        return this.prisma.safra.update({
            where: { id },
            data: {
                ...data,
                dataInicio: data.dataInicio ? new Date(data.dataInicio) : undefined,
                dataFim: data.dataFim ? new Date(data.dataFim) : undefined,
            }
        });
    }

    async remove(id: string): Promise<Safra> {
        return this.prisma.safra.delete({ where: { id } });
    }
}
