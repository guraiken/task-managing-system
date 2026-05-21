import type { Request, Response } from "express"
import { userService, type UserService } from "../services/UserService"

export class UserController {
    constructor(private readonly service: UserService) { }

    async listar(req: Request, res: Response) {
        try {
            const userToken = req.headers.authorization || ""
 
            const usuarios = await this.service.listar(userToken)

            return res.status(200).json(usuarios)
        } catch (error: any) {
            res.status(404).json({
                error,
                message: error?.message

            })
        }
    }

    async buscarPorId(req: Request, res: Response) {
        try {
            const userToken = req.headers.authorization || ""
            const dadosUsuario = Number(req.params.id)
            const usuarioBuscado = await this.service.buscarPorId(dadosUsuario, userToken)

            return res.status(201).json({
                data: usuarioBuscado,
                message: "Usuário encontrado com sucesso!"
            })
        } catch (error: any) {
            res.status(404).json({
                error,
                message: error?.message
            })
        }
    }

    async editar(req: Request, res: Response) {
        try {
            const dadosAtualizados = req.body
            const idUsuario = Number(req.params.id)
            const userToken = req.headers.authorization || ""

            const usuarioEditado = await this.service.editar(dadosAtualizados, idUsuario, userToken)

            res.status(200).json(usuarioEditado)

        } catch (error: any) {
            res.status(404).json({
                error,
                message: error?.message
            })
        }
    }

    async deletar(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const userToken = req.headers.authorization || ""

            const usuarioDeletado = await this.service.deletar(idUsuario, userToken)

            return res.status(200).json(usuarioDeletado)
        } catch (error: any) {
            res.status(404).json({
                error,
                message: error?.message
            })
        }
    }
}

export const userController = new UserController(userService)