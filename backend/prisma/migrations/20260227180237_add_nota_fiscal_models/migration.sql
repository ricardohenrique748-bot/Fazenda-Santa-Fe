/*
  Warnings:

  - A unique constraint covering the columns `[chassi]` on the table `Veiculo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cultura" ADD COLUMN     "multicultura" BOOLEAN DEFAULT false,
ALTER COLUMN "controlaPlantio" DROP NOT NULL,
ALTER COLUMN "exigirEspacamento" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "razaoSocial" DROP NOT NULL,
ALTER COLUMN "ativo" DROP NOT NULL,
ALTER COLUMN "ignorarCaixaFinanceiro" DROP NOT NULL,
ALTER COLUMN "ignorarEstoque" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EstoqueMovimentacao" ADD COLUMN     "notaFiscalId" TEXT;

-- AlterTable
ALTER TABLE "LancamentoFinanceiro" ADD COLUMN     "notaFiscalId" TEXT;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "empresaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Veiculo" ADD COLUMN     "chassi" TEXT;

-- CreateTable
CREATE TABLE "NotaFiscal" (
    "id" TEXT NOT NULL,
    "chaveAcesso" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "dataSaidaEntrada" TIMESTAMP(3),
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "naturezaOperacao" TEXT NOT NULL,
    "protocolo" TEXT,
    "emitenteNome" TEXT NOT NULL,
    "emitenteCnpj" TEXT NOT NULL,
    "emitenteIe" TEXT,
    "emitenteEndereco" TEXT,
    "emitenteCidade" TEXT,
    "emitenteUf" TEXT,
    "destinatarioNome" TEXT NOT NULL,
    "destinatarioCnpj" TEXT NOT NULL,
    "baseIcms" DOUBLE PRECISION DEFAULT 0,
    "valorIcms" DOUBLE PRECISION DEFAULT 0,
    "baseIcmsSt" DOUBLE PRECISION DEFAULT 0,
    "valorIcmsSt" DOUBLE PRECISION DEFAULT 0,
    "valorFrete" DOUBLE PRECISION DEFAULT 0,
    "valorSeguro" DOUBLE PRECISION DEFAULT 0,
    "valorDesconto" DOUBLE PRECISION DEFAULT 0,
    "valorIpi" DOUBLE PRECISION DEFAULT 0,
    "valorProdutos" DOUBLE PRECISION NOT NULL,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotaFiscal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemNotaFiscal" (
    "id" TEXT NOT NULL,
    "notaFiscalId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "ncm" TEXT,
    "cst" TEXT,
    "cfop" TEXT,
    "unidade" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "baseIcms" DOUBLE PRECISION DEFAULT 0,
    "valorIcms" DOUBLE PRECISION DEFAULT 0,
    "valorIpi" DOUBLE PRECISION DEFAULT 0,
    "aliquotaIcms" DOUBLE PRECISION DEFAULT 0,
    "aliquotaIpi" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "ItemNotaFiscal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DuplicataNotaFiscal" (
    "id" TEXT NOT NULL,
    "notaFiscalId" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DuplicataNotaFiscal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotaFiscal_chaveAcesso_key" ON "NotaFiscal"("chaveAcesso");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_chassi_key" ON "Veiculo"("chassi");

-- AddForeignKey
ALTER TABLE "EstoqueMovimentacao" ADD CONSTRAINT "EstoqueMovimentacao_notaFiscalId_fkey" FOREIGN KEY ("notaFiscalId") REFERENCES "NotaFiscal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LancamentoFinanceiro" ADD CONSTRAINT "LancamentoFinanceiro_notaFiscalId_fkey" FOREIGN KEY ("notaFiscalId") REFERENCES "NotaFiscal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaFiscal" ADD CONSTRAINT "NotaFiscal_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemNotaFiscal" ADD CONSTRAINT "ItemNotaFiscal_notaFiscalId_fkey" FOREIGN KEY ("notaFiscalId") REFERENCES "NotaFiscal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DuplicataNotaFiscal" ADD CONSTRAINT "DuplicataNotaFiscal_notaFiscalId_fkey" FOREIGN KEY ("notaFiscalId") REFERENCES "NotaFiscal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
