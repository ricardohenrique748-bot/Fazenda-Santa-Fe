const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const users = await prisma.usuario.count();
    const empresas = await prisma.empresa.count();
    console.log('Usuarios:', users);
    console.log('Empresas:', empresas);
}
main().catch(console.error).finally(() => prisma.$disconnect());
