import type { Request, Response } from "express"
import { criarTarefaService, ErroValidacaoTarefa } from "../services/tarefasService"




export async function criarTarefa(request: Request, response: Response) {
  try {
    const tarefa = await criarTarefaService(request.body)

    return response.status(201).json(tarefa)
  } catch (error) {
    if (error instanceof ErroValidacaoTarefa) {
      return response.status(400).json({ message: error.message })
    }

    return response.status(500).json({ message: "Erro ao criar tarefa" })
  }
}