/*
  Warnings:

  - You are about to drop the column `cultura` on the `PlanejamentoAgricola` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigo,empresaId]` on the table `PlanoContas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `empresaId` to the `PlanoContas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EtapaAgricola" AS ENUM ('PREPARO_SOLO', 'PLANTIO', 'TRATOS_CULTURAIS', 'COLHEITA');

-- DropIndex
DROP INDEX "PlanoContas_codigo_key";

-- AlterTable
ALTER TABLE "AtividadePlanejada" ADD COLUMN     "etapa" "EtapaAgricola";

-- AlterTable
ALTER TABLE "PlanejamentoAgricola" DROP COLUMN "cultura",
ADD COLUMN     "culturaId" TEXT,
ADD COLUMN     "custoEstimadoTotal" DOUBLE PRECISION,
ADD COLUMN     "custoPorHa" DOUBLE PRECISION,
ADD COLUMN     "metaProdutividade" DOUBLE PRECISION,
ADD COLUMN     "talhaoId" TEXT,
ADD COLUMN     "unidadeProdutividade" TEXT;

-- AlterTable
ALTER TABLE "PlanoContas" ADD COLUMN     "empresaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "empresaId" TEXT NOT NULL,
ADD COLUMN     "fabricanteId" TEXT,
ADD COLUMN     "grupoId" TEXT;

-- AlterTable
ALTER TABLE "Veiculo" ADD COLUMN     "grupoId" TEXT;

-- CreateTable
CREATE TABLE "GrupoProduto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrupoProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fabricante" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fabricante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoEquipamento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrupoEquipamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanoContas_codigo_empresaId_key" ON "PlanoContas"("codigo", "empresaId");

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "GrupoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "GrupoProduto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_fabricanteId_fkey" FOREIGN KEY ("fabricanteId") REFERENCES "Fabricante"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoProduto" ADD CONSTRAINT "GrupoProduto_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fabricante" ADD CONSTRAINT "Fabricante_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoContas" ADD CONSTRAINT "PlanoContas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanejamentoAgricola" ADD CONSTRAINT "PlanejamentoAgricola_talhaoId_fkey" FOREIGN KEY ("talhaoId") REFERENCES "Localizacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanejamentoAgricola" ADD CONSTRAINT "PlanejamentoAgricola_culturaId_fkey" FOREIGN KEY ("culturaId") REFERENCES "Cultura"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoEquipamento" ADD CONSTRAINT "GrupoEquipamento_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
