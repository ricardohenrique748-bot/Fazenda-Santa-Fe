const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log('PRISMA_KEYS:', Object.keys(prisma).filter(k => !k.startsWith('$') && !k.startsWith('_')));
process.exit(0);
