import { Router } from "express";
import { projetoController } from "../controller/projetoController";
import { roleMiddleware } from "../middleware/role";
import { Role } from "../prisma/generated/enums";

export const projetoRoutes = Router()

projetoRoutes.use(roleMiddleware([Role.ADMIN]))

projetoRoutes.get("/",async (req,res)=>{

    return projetoController.buscar(req,res)

})

projetoRoutes.get("/:id",async (req,res)=>{

    return projetoController.buscarPorId(req,res)

})

projetoRoutes.post("/",async (req,res)=>{

    return projetoController.criar(req,res)

})

projetoRoutes.delete("/:id",async (req,res)=>{

    return projetoController.deletar(req,res)

})

projetoRoutes.put("/:id",async (req,res)=>{

    return projetoController.atualizar(req,res)

})

