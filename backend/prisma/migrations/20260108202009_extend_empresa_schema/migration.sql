/*
  Warnings:

  - You are about to drop the column `nome` on the `Empresa` table. All the data in the column will be lost.
  - Added the required column `razaoSocial` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "nome",
ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "estado" TEXT,
ADD COLUMN     "inscricaoEstadual" TEXT,
ADD COLUMN     "logradouro" TEXT,
ADD COLUMN     "nomeFantasia" TEXT,
ADD COLUMN     "numero" TEXT,
ADD COLUMN     "razaoSocial" TEXT NOT NULL,
ADD COLUMN     "site" TEXT,
ADD COLUMN     "telefone" TEXT;
