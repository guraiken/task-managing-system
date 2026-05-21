import { Router } from "express";
import { projetoController } from "../controller/projetoController";

export const projetoRoutes = Router()



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

    return projetoController.buscar(req,res)

})

