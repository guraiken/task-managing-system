import type { Request, Response } from "express"
import { criarTarefaService, listarTarefasService } from "../Service/tarefas.service"


export async function listarTarefas(request: Request, response: Response) {
  try {
    const tarefas = await listarTarefasService()

    return response.status(200).json(tarefas)
  } catch (error) {
    return response.status(500).json({ message: "Erro ao listar tarefas" })
  }
}

export async function criarTarefa(request: Request, response: Response) {
  try {
    const tarefa = await criarTarefaService(request.body)

    return response.status(201).json(tarefa)
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message })
    }

    return response.status(500).json({ message: "Erro ao criar tarefa" })
  }
}
