import { Router } from "express"
import { genTrfController } from "../controller/GenTrfController"

const genTrfRoutes = Router()

genTrfRoutes.get("/", genTrfController.listar)

genTrfRoutes.get("/:id", genTrfController.buscarPorId)

genTrfRoutes.put("/:id", genTrfController.atualizar)

genTrfRoutes.delete("/:id", genTrfController.deletar)

export default genTrfRoutes