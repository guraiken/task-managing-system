-- CreateEnum
CREATE TYPE "Prioridade" AS ENUM ('Baixa', 'Media', 'Alta');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pausada', 'Andamento', 'Concluida', 'Reaberta');

-- CreateTable
CREATE TABLE "Tarefa" (
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

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioEmTarefa" (
    "tarefaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "UsuarioEmTarefa_pkey" PRIMARY KEY ("tarefaId","usuarioId")
);

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_dono_id_fkey" FOREIGN KEY ("dono_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_resp_id_fkey" FOREIGN KEY ("resp_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioEmTarefa" ADD CONSTRAINT "UsuarioEmTarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "Tarefa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioEmTarefa" ADD CONSTRAINT "UsuarioEmTarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
