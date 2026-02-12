import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const email = 'ruan.junior@eunaman.com.br';
    const passwordToCheck = '123456';

    console.log(`Verifying user: ${email}`);
    const user = await prisma.usuario.findUnique({
        where: { email },
    });

    if (!user) {
        console.error('User not found!');
        return;
    }

    console.log('User found:', user.email);
    console.log('Stored Hash:', user.senha);

    const isMatch = await bcrypt.compare(passwordToCheck, user.senha);
    console.log(`Password "${passwordToCheck}" matches?`, isMatch);

    if (isMatch) {
        console.log("SUCCESS: Password is correct in DB.");
    } else {
        console.log("FAILURE: Password in DB does not match '123456'.");
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
