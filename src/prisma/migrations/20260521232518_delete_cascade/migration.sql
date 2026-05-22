-- DropForeignKey
ALTER TABLE "tarefa" DROP CONSTRAINT "tarefa_projeto_id_fkey";

-- DropForeignKey
ALTER TABLE "usuario_em_projeto" DROP CONSTRAINT "usuario_em_projeto_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "usuario_em_projeto" DROP CONSTRAINT "usuario_em_projeto_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "usuario_em_projeto" ADD CONSTRAINT "usuario_em_projeto_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_em_projeto" ADD CONSTRAINT "usuario_em_projeto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
