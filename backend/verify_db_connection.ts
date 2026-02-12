import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Attempting to connect to the database...');
    try {
        await prisma.$connect();
        console.log('Successfully connected to the database!');
        const count = await prisma.usuario.count();
        console.log(`There are ${count} users in the database.`);
    } catch (error: any) {
        console.error('Failed to connect to the database.');
        console.error('Error message:', error.message);
        if (error.code) {
            console.error('Error code:', error.code);
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
