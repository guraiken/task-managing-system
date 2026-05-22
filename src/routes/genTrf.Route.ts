import { Router } from "express"
import { genTrfController } from "../controller/GenTrfController"
import { roleMiddleware } from "../middleware/role"
import { Role } from "../prisma/generated/enums"

const genTrfRoutes = Router()

genTrfRoutes.use(roleMiddleware([Role.ADMIN]))

genTrfRoutes.get("/", genTrfController.listar)

genTrfRoutes.get("/:id", genTrfController.buscarPorId)

genTrfRoutes.put("/:id", genTrfController.atualizar)

genTrfRoutes.delete("/:id", genTrfController.deletar)

export default genTrfRoutes