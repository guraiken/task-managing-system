import { Router } from "express";
import { projetoController } from "../controller/projetoController";

export const projetoRoutes = Router()



projetoRoutes.get("http://localhost:3000/",async (req,res)=>{

    return projetoController.buscar(req,res)

})

projetoRoutes.get("http://localhost:3000/:id",async (req,res)=>{

    return projetoController.buscarPorId(req,res)

})

projetoRoutes.post("http://localhost:3000/",async (req,res)=>{

    return projetoController.criar(req,res)

})

projetoRoutes.delete("http://localhost:3000/:id",async (req,res)=>{

    return projetoController.deletar(req,res)

})

projetoRoutes.put("http://localhost:3000/:id",async (req,res)=>{

    return projetoController.buscar(req,res)

})

