import type { Request, Response } from "express"
import { criarTarefaService, listarTarefasService } from "../Service/tarefas.service"

export async function listarTarefas(request: Request, response: Response) {
  const tarefas = await listarTarefasService()

  return response.json(tarefas)
}

export async function criarTarefa(request: Request, response: Response) {
  const tarefa = await criarTarefaService(request.body)

  return response.status(201).json(tarefa)
}
