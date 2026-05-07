import { Router } from "express";

export const authRouter = Router();

authRouter.post("/cadastro", async (req, res) => {
    return authController.cadastrar(req, res)
})

authRouter.post("/login", async (req, res) => {
    return authController.logar(req, res)
})