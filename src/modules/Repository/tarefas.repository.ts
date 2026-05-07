import { prisma } from "../../prisma/prisma"

type CriarTarefaDados = {
  titulo: string
  descricao?: string
}

export function listarTarefasRepository() {
  return prisma.tarefa.findMany()
}

export function criarTarefaRepository(dados: CriarTarefaDados) {
  return prisma.tarefa.create({
    data: {
      titulo: dados.titulo,
      descricao: dados.descricao,
    },
  })
}
