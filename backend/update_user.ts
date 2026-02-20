import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.usuario.findMany({
            where: { nome: { contains: 'ruan', mode: 'insensitive' } }
        });
        console.log('Encontrados:', JSON.stringify(users, null, 2));

        if (users.length > 0) {
            for (const u of users) {
                await prisma.usuario.update({
                    where: { id: u.id },
                    data: { role: 'ADMIN' }
                });
                console.log(`Usuário ${u.nome} atualizado para ADMIN.`);
            }
        } else {
            console.log('Usuário Ruan não encontrado.');
        }
    } catch (error) {
        console.error('Error during update:', error);
    }
}

main().finally(() => prisma.$disconnect());
