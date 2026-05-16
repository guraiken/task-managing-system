import { Router } from "express"
import { criarTarefa } from "../Controller/tarefas.controller"

const tarefasRoutes = Router()

tarefasRoutes.post("/", criarTarefa)


export default tarefasRoutes
