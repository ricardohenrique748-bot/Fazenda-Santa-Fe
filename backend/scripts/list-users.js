const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.usuario.findMany({
            include: { empresa: true }
        });
        console.log('USERS_FOUND:', users.length);
        users.forEach(u => {
            console.log(`- ${u.email} (Role: ${u.role}, Company: ${u.empresa.razaoSocial})`);
        });
    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
