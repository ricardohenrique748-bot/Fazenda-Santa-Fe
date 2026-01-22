/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ContratoComercial" ADD COLUMN     "clienteId" TEXT,
ALTER COLUMN "cliente" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "aliquotaRat" DOUBLE PRECISION,
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "cei" TEXT,
ADD COLUMN     "cfop" TEXT,
ADD COLUMN     "cnaeFiscal" TEXT,
ADD COLUMN     "codigo" TEXT,
ADD COLUMN     "codigoFap" TEXT,
ADD COLUMN     "codigoFpas" TEXT,
ADD COLUMN     "codigoGps" TEXT,
ADD COLUMN     "codigoSimples" TEXT,
ADD COLUMN     "correspondenciaBairro" TEXT,
ADD COLUMN     "correspondenciaCep" TEXT,
ADD COLUMN     "correspondenciaCidade" TEXT,
ADD COLUMN     "correspondenciaEstado" TEXT,
ADD COLUMN     "correspondenciaLogradouro" TEXT,
ADD COLUMN     "correspondenciaNumero" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "ignorarCaixaFinanceiro" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ignorarEstoque" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "inscricaoMunicipal" TEXT,
ADD COLUMN     "lotacaoTributaria" TEXT,
ADD COLUMN     "outrasEntidades" TEXT,
ALTER COLUMN "cnpj" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT,
    "cpfCnpj" TEXT NOT NULL,
    "inscricaoEstadual" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "endereco" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoVenda" (
    "id" TEXT NOT NULL,
    "numero" SERIAL NOT NULL,
    "clienteId" TEXT NOT NULL,
    "dataPedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'ABERTO',
    "valorTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "observacoes" TEXT,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PedidoVenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPedidoVenda" (
    "id" TEXT NOT NULL,
    "pedidoVendaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemPedidoVenda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpfCnpj_key" ON "Cliente"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cpf_key" ON "Empresa"("cpf");

-- AddForeignKey
ALTER TABLE "ContratoComercial" ADD CONSTRAINT "ContratoComercial_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoVenda" ADD CONSTRAINT "PedidoVenda_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoVenda" ADD CONSTRAINT "PedidoVenda_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedidoVenda" ADD CONSTRAINT "ItemPedidoVenda_pedidoVendaId_fkey" FOREIGN KEY ("pedidoVendaId") REFERENCES "PedidoVenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedidoVenda" ADD CONSTRAINT "ItemPedidoVenda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
