import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('--- DIAGNOSIS START ---');
    try {
        const empresas = await prisma.empresa.findMany();
        console.log(`Found ${empresas.length} companies:`);
        empresas.forEach(e => console.log(` - ID: ${e.id}, Name: ${e.razaoSocial}`));

        const users = await prisma.usuario.findMany();
        console.log(`Found ${users.length} users:`);
        users.forEach(u => console.log(` - Email: ${u.email}, EmpresaId: ${u.empresaId}, Hash: ${u.senha.substring(0, 10)}...`));

        const targetEmail = 'ruan.junior@eunaman.com.br';
        const targetUser = users.find(u => u.email === targetEmail);

        if (targetUser) {
            console.log(`\nTarget user ${targetEmail} FOUND.`);
            const valid = await bcrypt.compare('123456', targetUser.senha);
            console.log(`Password '123456' match: ${valid}`);
        } else {
            console.log(`\nTarget user ${targetEmail} NOT FOUND.`);

            if (empresas.length > 0) {
                console.log('Attempting to create user...');
                const hash = await bcrypt.hash('123456', 10);
                const newUser = await prisma.usuario.create({
                    data: {
                        nome: 'Ruan Junior',
                        email: targetEmail,
                        senha: hash,
                        empresaId: empresas[0].id,
                        role: 'ADMIN' // Assuming ADMIN role is appropriate
                    }
                });
                console.log('User created:', newUser);
            } else {
                console.error('Cannot create user: No companies found.');
            }
        }

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await prisma.$disconnect();
        console.log('--- DIAGNOSIS END ---');
    }
}

main();
