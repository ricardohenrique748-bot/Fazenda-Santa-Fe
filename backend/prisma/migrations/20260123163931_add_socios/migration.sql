-- CreateTable
CREATE TABLE "Socio" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "cnpj" TEXT,
    "percentual" DOUBLE PRECISION,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Socio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Socio" ADD CONSTRAINT "Socio_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
