import { Router } from "express"
import { criarTarefa, listarTarefas } from "../Controller/tarefas.controller"

const tarefasRoutes = Router()

tarefasRoutes.post("/", criarTarefa)
tarefasRoutes.get("/", listarTarefas)

export default tarefasRoutes
