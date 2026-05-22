/*
  Warnings:

  - The values [Baixa,Media,Alta] on the enum `Prioridade` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Prioridade_new" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');
ALTER TABLE "tarefa" ALTER COLUMN "prioridade" TYPE "Prioridade_new" USING ("prioridade"::text::"Prioridade_new");
ALTER TYPE "Prioridade" RENAME TO "Prioridade_old";
ALTER TYPE "Prioridade_new" RENAME TO "Prioridade";
DROP TYPE "public"."Prioridade_old";
COMMIT;
