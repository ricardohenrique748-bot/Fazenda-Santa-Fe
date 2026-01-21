const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

console.log('DATABASE_URL da env:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log('Conexão bem sucedida!');
    } catch (err) {
        console.error('Erro de conexão:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
