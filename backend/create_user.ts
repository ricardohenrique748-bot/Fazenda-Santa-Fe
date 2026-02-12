import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const email = 'ruan.junior@eunaman.com.br';
    const password = '123456';
    const saltRounds = 10;

    console.log(`Checking if user ${email} exists...`);
    const existingUser = await prisma.usuario.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log(`User ${email} already exists. Updating password...`);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await prisma.usuario.update({
            where: { email },
            data: { senha: hashedPassword },
        });
        console.log(`Password updated for user ${email}.`);
    } else {
        console.log(`User ${email} does not exist. Creating...`);

        // Find a company to associate with
        const empresa = await prisma.empresa.findFirst();

        if (!empresa) {
            console.error('No company (Empresa) found in the database.Cannot create user without an Empresa.');
            process.exit(1);
        }

        console.log(`Associating user with company: ${empresa.razaoSocial} (ID: ${empresa.id})`);

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.usuario.create({
            data: {
                nome: 'Ruan Junior', // Assuming name from email
                email,
                senha: hashedPassword,
                empresaId: empresa.id,
                role: 'OPERADOR', // Default role, user can change later if needed
            },
        });

        console.log(`User created successfully:`);
        console.log(`ID: ${newUser.id}`);
        console.log(`Name: ${newUser.nome}`);
        console.log(`Email: ${newUser.email}`);
        console.log(`Role: ${newUser.role}`);
    }
}

main()
    .catch((e) => {
        console.error('FULL ERROR:', JSON.stringify(e, null, 2));
        if (e instanceof Error) {
            console.error('Message:', e.message);
            console.error('Stack:', e.stack);
        }
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
