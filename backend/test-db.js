
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function main() {
    try {
        const cleanUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@') : 'MISSING';
        console.log('Connecting to:', cleanUrl);
        await prisma.$connect();
        console.log('CONNECTED SUCCESS!');
        const tables = await prisma.$queryRaw`SELECT 1 as test`;
        console.log('Query result:', tables);
    } catch (e) {
        console.error('FAILED TO CONNECT');
        console.error('CODE:', e.code);
        console.error('MESSAGE:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
