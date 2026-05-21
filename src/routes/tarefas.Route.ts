import { Router } from "express"
import { criarTarefa } from "../controller/tarefasController"

const tarefasRoutes = Router()

tarefasRoutes.post("/", criarTarefa)


export default tarefasRoutes