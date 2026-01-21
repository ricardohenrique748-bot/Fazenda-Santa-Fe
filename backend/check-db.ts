import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.usuario.findMany({
        include: { empresa: true }
    });
    console.log('USERS IN DB:');
    users.forEach(u => {
        console.log(`- ${u.nome} (${u.email}): Empresa ID ${u.empresaId} - ${u.empresa?.razaoSocial}`);
    });
}

main().finally(() => prisma.$disconnect());
