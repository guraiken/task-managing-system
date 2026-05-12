import { Router } from "express";
import { userController } from "../controller/UserController";

export const userRouter = Router();

userRouter.post("/usuarios", async (req, res) => {
    return userController.listar(req, res)
})

userRouter.post("/usuarios", async (req, res) => {
    return userController.buscarPorId(req, res)
})

userRouter.post("/usuarios", async (req, res) => {
    return userController.editar(req, res)
})

userRouter.post("/usuarios", async (req, res) => {
    return userController.deletar(req, res)
})