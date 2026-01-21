const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasourceUrl: 'postgresql://postgres:password@localhost:5435/malut_db?schema=public',
});

async function main() {
    try {
        await prisma.$connect();
        console.log('✅ Conexão bem sucedida!');

        const users = await prisma.usuario.findMany();
        console.log(`📊 Usuários encontrados: ${users.length}`);

    } catch (err) {
        console.error('❌ Erro de conexão:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
