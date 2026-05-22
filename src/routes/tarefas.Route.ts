import { Router } from "express"
import { criarTarefa } from "../controller/tarefasController"
import { roleMiddleware } from "../middleware/role"
import { Role } from "../prisma/generated/enums"

const tarefasRoutes = Router()

tarefasRoutes.use(roleMiddleware([Role.ADMIN]))

tarefasRoutes.post("/", criarTarefa)


export default tarefasRoutes