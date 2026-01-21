"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const email = 'ricardo.luz@eunaman.com.br';
    const password = '85245655';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Seed: Iniciando processo para', email);
    const empresa = await prisma.empresa.upsert({
        where: { cnpj: '00.000.000/0001-00' },
        update: {},
        create: {
            razaoSocial: 'Malut Soluções',
            cnpj: '00.000.000/0001-00',
            nomeFantasia: 'Malut'
        }
    });
    const user = await prisma.usuario.upsert({
        where: { email },
        update: {
            senha: hashedPassword,
            role: 'ADMIN',
            ativo: true
        },
        create: {
            nome: 'Ricardo Luz',
            email,
            senha: hashedPassword,
            role: 'ADMIN',
            empresaId: empresa.id,
            ativo: true
        }
    });
    console.log('Seed: SUCESSO! Usuário Ricardo Luz (ADMIN) está pronto para login.');
}
main()
    .catch((e) => {
    console.error('Seed: ERRO FATAL!', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map