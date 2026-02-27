-- Adiciona tabelas e colunas que foram criadas via db push após a migration 20260123163931_add_socios
-- Incluindo: Cliente, PedidoVenda, ItemPedidoVenda, EPI, EntregaEPI, ExameOcupacional, GrupoEquipamento, Fabricante, GrupoProduto, campos novos

-- CreateTable Cliente (if not exists)
CREATE TABLE IF NOT EXISTS "Cliente" (
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

-- CreateTable PedidoVenda (if not exists)
CREATE TABLE IF NOT EXISTS "PedidoVenda" (
    "id" TEXT NOT NULL,
    "numero" SERIAL,
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

-- CreateTable ItemPedidoVenda (if not exists)
CREATE TABLE IF NOT EXISTS "ItemPedidoVenda" (
    "id" TEXT NOT NULL,
    "pedidoVendaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    CONSTRAINT "ItemPedidoVenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable EPI (if not exists)
CREATE TABLE IF NOT EXISTS "EPI" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ca" TEXT,
    "validadeDias" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "EPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable EntregaEPI (if not exists)
CREATE TABLE IF NOT EXISTS "EntregaEPI" (
    "id" TEXT NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "epiId" TEXT NOT NULL,
    "dataEntrega" TIMESTAMP(3) NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "observacao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EntregaEPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable ExameOcupacional (if not exists)
CREATE TABLE IF NOT EXISTS "ExameOcupacional" (
    "id" TEXT NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataRealizacao" TIMESTAMP(3) NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "resultado" TEXT NOT NULL DEFAULT 'APTO',
    "medico" TEXT,
    "crm" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ExameOcupacional_pkey" PRIMARY KEY ("id")
);

-- CreateTable GrupoEquipamento (if not exists)
CREATE TABLE IF NOT EXISTS "GrupoEquipamento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GrupoEquipamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable GrupoProduto (if not exists)
CREATE TABLE IF NOT EXISTS "GrupoProduto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GrupoProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable Fabricante (if not exists)
CREATE TABLE IF NOT EXISTS "Fabricante" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Fabricante_pkey" PRIMARY KEY ("id")
);

-- CreateTable ContratoComercial (if not exists)
CREATE TABLE IF NOT EXISTS "ContratoComercial" (
    "id" TEXT NOT NULL,
    "cliente" TEXT,
    "clienteId" TEXT,
    "cultura" TEXT NOT NULL,
    "safra" TEXT NOT NULL,
    "quantidadeTotal" DOUBLE PRECISION NOT NULL,
    "valorPorUnidade" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContratoComercial_pkey" PRIMARY KEY ("id")
);

-- AddColumn grupoId to Veiculo (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Veiculo' AND column_name='grupoId') THEN
        ALTER TABLE "Veiculo" ADD COLUMN "grupoId" TEXT;
    END IF;
END $$;

-- AddColumn grupoId to Produto (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Produto' AND column_name='grupoId') THEN
        ALTER TABLE "Produto" ADD COLUMN "grupoId" TEXT;
    END IF;
END $$;

-- AddColumn fabricanteId to Produto (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Produto' AND column_name='fabricanteId') THEN
        ALTER TABLE "Produto" ADD COLUMN "fabricanteId" TEXT;
    END IF;
END $$;

-- AddColumn empresaId to Produto (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Produto' AND column_name='empresaId') THEN
        ALTER TABLE "Produto" ADD COLUMN "empresaId" TEXT;
    END IF;
END $$;

-- Add Cultura columns (if not exists)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Cultura' AND column_name='unidadeCaptacao') THEN
        ALTER TABLE "Cultura" ADD COLUMN "unidadeCaptacao" TEXT;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Cultura' AND column_name='unidadeSaida') THEN
        ALTER TABLE "Cultura" ADD COLUMN "unidadeSaida" TEXT;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Cultura' AND column_name='controlaPlantio') THEN
        ALTER TABLE "Cultura" ADD COLUMN "controlaPlantio" BOOLEAN NOT NULL DEFAULT false;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Cultura' AND column_name='exigirEspacamento') THEN
        ALTER TABLE "Cultura" ADD COLUMN "exigirEspacamento" BOOLEAN NOT NULL DEFAULT false;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Cultura' AND column_name='estado') THEN
        ALTER TABLE "Cultura" ADD COLUMN "estado" TEXT;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Cultura' AND column_name='municipio') THEN
        ALTER TABLE "Cultura" ADD COLUMN "municipio" TEXT;
    END IF;
END $$;

-- Add missing PlanoContas columns
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='PlanoContas' AND column_name='formaPagamento') THEN
        ALTER TABLE "PlanoContas" ADD COLUMN "formaPagamento" TEXT;
    END IF;
END $$;

-- Add missing LancamentoFinanceiro columns
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='LancamentoFinanceiro' AND column_name='formaPagamento') THEN
        ALTER TABLE "LancamentoFinanceiro" ADD COLUMN "formaPagamento" TEXT;
    END IF;
END $$;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Cliente_cpfCnpj_key" ON "Cliente"("cpfCnpj");
CREATE UNIQUE INDEX IF NOT EXISTS "PlanoContas_codigo_empresaId_key" ON "PlanoContas"("codigo", "empresaId");

-- AddForeignKeys
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='Cliente_empresaId_fkey') THEN
        ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='PedidoVenda_clienteId_fkey') THEN
        ALTER TABLE "PedidoVenda" ADD CONSTRAINT "PedidoVenda_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='PedidoVenda_empresaId_fkey') THEN
        ALTER TABLE "PedidoVenda" ADD CONSTRAINT "PedidoVenda_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='ItemPedidoVenda_pedidoVendaId_fkey') THEN
        ALTER TABLE "ItemPedidoVenda" ADD CONSTRAINT "ItemPedidoVenda_pedidoVendaId_fkey" FOREIGN KEY ("pedidoVendaId") REFERENCES "PedidoVenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='ItemPedidoVenda_produtoId_fkey') THEN
        ALTER TABLE "ItemPedidoVenda" ADD CONSTRAINT "ItemPedidoVenda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='EntregaEPI_epiId_fkey') THEN
        ALTER TABLE "EntregaEPI" ADD CONSTRAINT "EntregaEPI_epiId_fkey" FOREIGN KEY ("epiId") REFERENCES "EPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='EntregaEPI_funcionarioId_fkey') THEN
        ALTER TABLE "EntregaEPI" ADD CONSTRAINT "EntregaEPI_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='ExameOcupacional_funcionarioId_fkey') THEN
        ALTER TABLE "ExameOcupacional" ADD CONSTRAINT "ExameOcupacional_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='GrupoEquipamento_empresaId_fkey') THEN
        ALTER TABLE "GrupoEquipamento" ADD CONSTRAINT "GrupoEquipamento_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='GrupoProduto_empresaId_fkey') THEN
        ALTER TABLE "GrupoProduto" ADD CONSTRAINT "GrupoProduto_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='Fabricante_empresaId_fkey') THEN
        ALTER TABLE "Fabricante" ADD CONSTRAINT "Fabricante_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='ContratoComercial_clienteId_fkey') THEN
        ALTER TABLE "ContratoComercial" ADD CONSTRAINT "ContratoComercial_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='Veiculo_grupoId_fkey') THEN
        ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "GrupoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='Produto_grupoId_fkey') THEN
        ALTER TABLE "Produto" ADD CONSTRAINT "Produto_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "GrupoProduto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='Produto_fabricanteId_fkey') THEN
        ALTER TABLE "Produto" ADD CONSTRAINT "Produto_fabricanteId_fkey" FOREIGN KEY ("fabricanteId") REFERENCES "Fabricante"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='Produto_empresaId_fkey') THEN
        ALTER TABLE "Produto" ADD CONSTRAINT "Produto_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
