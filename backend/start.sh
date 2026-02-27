#!/bin/bash
set -e

# Remove qualquer caractere invisível (newline, espaço) do DATABASE_URL
export DATABASE_URL=$(echo "$DATABASE_URL" | tr -d '\n\r\t ')

echo "==> Iniciando com DATABASE_URL: ${DATABASE_URL:0:40}..."

# Roda as migrações
npx prisma migrate deploy

# Inicia a aplicação
node dist/main
