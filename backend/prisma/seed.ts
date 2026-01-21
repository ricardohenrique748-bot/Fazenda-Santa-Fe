import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const email = 'ricardo.luz@eunaman.com.br'
    const password = '85245655'
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    console.log('Seed: Iniciando processo para', email)

    // 1. Criar ou Encontrar Empresa
    const empresa = await prisma.empresa.upsert({
        where: { cnpj: '00.000.000/0001-00' },
        update: {},
        create: {
            razaoSocial: 'Malut Soluções',
            cnpj: '00.000.000/0001-00',
            nomeFantasia: 'Malut'
        }
    })

    // 2. Criar ou Atualizar Usuário Ricardo
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
    })

    console.log('Seed: SUCESSO! Usuário Ricardo Luz (ADMIN) está pronto para login.')
}

main()
    .catch((e) => {
        console.error('Seed: ERRO FATAL!', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
