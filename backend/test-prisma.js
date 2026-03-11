const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.grupoEquipamento.findMany().then(console.log).catch(console.error).finally(()=>prisma.$disconnect());
