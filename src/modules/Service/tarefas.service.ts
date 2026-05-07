import { criarTarefaRepository, listarTarefasRepository } from "../Repository/tarefas.repository"

type CriarTarefaDados = {
  titulo: string
  descricao?: string
}

export function listarTarefasService() {
  return listarTarefasRepository()
}

export function criarTarefaService(dados: CriarTarefaDados) {
  return criarTarefaRepository(dados)
}
