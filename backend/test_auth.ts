import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const email = 'ricardo.luz@eunaman.com.br'
    const password = '85245655'

    const user = await prisma.usuario.findUnique({ where: { email } })
    if (!user) {
        console.log('User not found!')
        return
    }

    console.log('User found:', user.email)
    const isValid = await bcrypt.compare(password, user.senha)
    console.log('Password is valid:', isValid)
}

main().catch(console.error).finally(() => prisma.$disconnect())
