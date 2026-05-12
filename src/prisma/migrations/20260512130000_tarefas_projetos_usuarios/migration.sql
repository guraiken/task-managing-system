-- CreateEnum
CREATE TYPE "Prioridade" AS ENUM ('Baixa', 'Media', 'Alta');

-- CreateTable
CREATE TABLE "projeto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "area_conhecimento" TEXT NOT NULL,

    CONSTRAINT "projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "prioridade" "Prioridade" NOT NULL,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioEmTarefa" (
    "tarefaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "UsuarioEmTarefa_pkey" PRIMARY KEY ("tarefaId","usuarioId")
);

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioEmTarefa" ADD CONSTRAINT "UsuarioEmTarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "tarefa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioEmTarefa" ADD CONSTRAINT "UsuarioEmTarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
