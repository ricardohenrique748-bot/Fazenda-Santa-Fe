import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.usuario.findMany({
            where: { nome: { contains: 'ruan', mode: 'insensitive' } }
        });

        let output = 'Encontrados: ' + JSON.stringify(users, null, 2) + '\n';

        if (users.length > 0) {
            for (const u of users) {
                await prisma.usuario.update({
                    where: { id: u.id },
                    data: { role: 'ADMIN' }
                });
                output += `Usuário ${u.nome} atualizado para ADMIN.\n`;
            }
        } else {
            output += 'Usuário Ruan não encontrado.\n';
        }
        fs.writeFileSync('out_utf8.log', output, 'utf8');
    } catch (error: any) {
        fs.writeFileSync('out_utf8.log', 'Error: ' + error.message + '\n' + error.stack, 'utf8');
    }
}

main().finally(() => prisma.$disconnect());
