"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
//# sourceMappingURL=check-db.js.map