const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.usuario.findUnique({
            where: { email: 'ricardo.luz@eunaman.com.br' }
        });
        console.log('CHECK_RESULT:', user ? 'EXISTS' : 'NOT_FOUND');
        if (user) {
            console.log('USER_DETAILS:', JSON.stringify({ email: user.email, role: user.role }));
        }
    } catch (err) {
        console.error('CHECK_ERROR:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
