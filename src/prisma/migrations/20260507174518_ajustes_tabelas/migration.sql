-- CreateEnum
CREATE TYPE "NivelAcesso" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- CreateEnum
CREATE TYPE "Prioridade" AS ENUM ('Baixa', 'Media', 'Alta');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pausada', 'Andamento', 'Concluida', 'Reaberta');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nivel_acesso" "NivelAcesso" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "dono_id" INTEGER NOT NULL,
    "titulo_prjt" TEXT NOT NULL,
    "area" TEXT NOT NULL DEFAULT 'Desconhecida',
    "descr" TEXT NOT NULL DEFAULT 'Pendente',

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "projeto_id" INTEGER NOT NULL,
    "titulo_trf" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "dono_id" INTEGER NOT NULL,
    "resp_id" INTEGER NOT NULL,
    "nivel_acesso" "NivelAcesso" NOT NULL,
    "data_i" TIMESTAMP(3) NOT NULL,
    "data_v" TIMESTAMP(3) NOT NULL,
    "data_f" TIMESTAMP(3) NOT NULL,
    "prioridade" "Prioridade" NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_dono_id_fkey" FOREIGN KEY ("dono_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_dono_id_fkey" FOREIGN KEY ("dono_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_resp_id_fkey" FOREIGN KEY ("resp_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
