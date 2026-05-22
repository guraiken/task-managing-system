/*
  Warnings:

  - You are about to drop the `Tarefa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsuarioEmProjeto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsuarioEmTarefa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_dono_id_fkey";

-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_projeto_id_fkey";

-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_resp_id_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioEmProjeto" DROP CONSTRAINT "UsuarioEmProjeto_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioEmProjeto" DROP CONSTRAINT "UsuarioEmProjeto_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioEmTarefa" DROP CONSTRAINT "UsuarioEmTarefa_tarefaId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioEmTarefa" DROP CONSTRAINT "UsuarioEmTarefa_usuarioId_fkey";

-- AlterTable
ALTER TABLE "token" ALTER COLUMN "token" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Tarefa";

-- DropTable
DROP TABLE "UsuarioEmProjeto";

-- DropTable
DROP TABLE "UsuarioEmTarefa";

-- CreateTable
CREATE TABLE "usuario_em_projeto" (
    "projetoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "usuario_em_projeto_pkey" PRIMARY KEY ("projetoId","usuarioId")
);

-- CreateTable
CREATE TABLE "tarefa" (
    "id" SERIAL NOT NULL,
    "projeto_id" INTEGER NOT NULL,
    "titulo_trf" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "dono_id" INTEGER NOT NULL,
    "resp_id" INTEGER NOT NULL,
    "data_i" TIMESTAMP(3) NOT NULL,
    "data_f" TIMESTAMP(3) NOT NULL,
    "prioridade" "Prioridade" NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_em_tarefa" (
    "tarefaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "usuario_em_tarefa_pkey" PRIMARY KEY ("tarefaId","usuarioId")
);

-- AddForeignKey
ALTER TABLE "usuario_em_projeto" ADD CONSTRAINT "usuario_em_projeto_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_em_projeto" ADD CONSTRAINT "usuario_em_projeto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_dono_id_fkey" FOREIGN KEY ("dono_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_resp_id_fkey" FOREIGN KEY ("resp_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_em_tarefa" ADD CONSTRAINT "usuario_em_tarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "tarefa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_em_tarefa" ADD CONSTRAINT "usuario_em_tarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
