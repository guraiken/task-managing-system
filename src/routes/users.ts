import { Router } from "express";
import { userController } from "../controller/UserController";

export const userRouter = Router();

userRouter.get("", async (req, res) => {
    return userController.listar(req, res)
})

userRouter.get("/:id", async (req, res) => {
    return userController.buscarPorId(req, res)
})

userRouter.put("/:id", async (req, res) => {
    return userController.editar(req, res)
})

userRouter.delete("/:id", async (req, res) => {
    return userController.deletar(req, res)
})