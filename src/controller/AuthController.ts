import type { Errback, ErrorRequestHandler, Request, Response } from "express";
import type { Usuario } from "../prisma/generated/client";
import { authService, type AuthService } from "../services/AuthService";

export class AuthController{
    constructor(private readonly service: AuthService){}

    async cadastrar(req: Request, res: Response){
        try {
            const dadosUsuario = req.body
            const usuarioCriado = await this.service.cadastrar(dadosUsuario)

           
            return res.status(201).json({
                data: usuarioCriado,
                message: "Usuário criado com sucesso!"
            })
        } catch (error: any)
         {
            res.status(404).json({
                error,
                message: error?.message
            })
        }
    }

    async logar(req: Request, res: Response){
        try {
            const dadosUsuario = req.body as Usuario
            const dadosLogin = await this.service.logar(dadosUsuario)

            return res.status(200).json({
                message: "Usuário autenticado com sucesso!",
                data: {
                    accessToken: dadosLogin.tokenAcesso,
                    refreshToken: dadosLogin.tokenRefresh
                }
            })
        } catch (error: any) {
            res.status(404).json({
                error,
                message: error?.message
            })
        }
    }
}

export const authController = new AuthController(authService)