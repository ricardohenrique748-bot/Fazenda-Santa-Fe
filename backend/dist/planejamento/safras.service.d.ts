import { PrismaService } from '../prisma/prisma.service';
import { Safra } from '@prisma/client';
export declare class SafrasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<Safra>;
    findAll(): Promise<Safra[]>;
    findOne(id: string): Promise<Safra | null>;
    update(id: string, data: any): Promise<Safra>;
    remove(id: string): Promise<Safra>;
}
