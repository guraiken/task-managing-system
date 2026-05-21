import type { Request, Response } from "express"
import { genTrfService } from "../services/GenTrfService"

class GenTrfController {

    async listar(req: Request, res: Response) {

        try {

            const tarefas = await genTrfService.listar()

            return res.status(200).json({
                mensagem: "Tarefas listadas com sucesso",
                tarefas
            })

        } catch (error) {

            return res.status(500).json({
                mensagem: "Erro ao listar tarefas",
                erro: error instanceof Error ? error.message : error
            })

        }

    }

    async buscarPorId(req: Request, res: Response) {

        try {

            const id = Number(req.params.id)

            const tarefa = await genTrfService.buscarPorId(id)

            return res.status(200).json({
                mensagem: "Tarefa encontrada com sucesso",
                tarefa
            })

        } catch (error) {

            return res.status(404).json({
                mensagem: "Erro ao buscar tarefa",
                erro: error instanceof Error ? error.message : error
            })

        }

    }

    async atualizar(req: Request, res: Response) {

        try {

            const id = Number(req.params.id)

            const {
                titulo_trf,
                descr,
                data_i,
                data_f,
                prioridade,
                status,
                projeto_id,
                dono_id,
                resp_id,
                usuariosIds
            } = req.body

            const tarefaAtualizada = await genTrfService.atualizar({

                id,

                ...(titulo_trf !== undefined && {
                    titulo_trf
                }),

                ...(descr !== undefined && {
                    descr
                }),

                ...(data_i !== undefined && {
                    data_i: new Date(data_i)
                }),

                ...(data_f !== undefined && {
                    data_f: new Date(data_f)
                }),

                ...(prioridade !== undefined && {
                    prioridade
                }),

                ...(status !== undefined && {
                    status
                }),

                ...(projeto_id !== undefined && {
                    projeto_id
                }),

                ...(dono_id !== undefined && {
                    dono_id
                }),

                ...(resp_id !== undefined && {
                    resp_id
                }),

                ...(usuariosIds !== undefined && {
                    usuariosIds
                })

            })

            return res.status(200).json({
                mensagem: "Tarefa atualizada com sucesso",
                tarefa: tarefaAtualizada
            })

        } catch (error) {

            return res.status(400).json({
                mensagem: "Erro ao atualizar tarefa",
                erro: error instanceof Error ? error.message : error
            })

        }

    }

    async deletar(req: Request, res: Response) {

        try {

            const id = Number(req.params.id)

            await genTrfService.deletar(id)

            return res.status(200).json({
                mensagem: "Tarefa deletada com sucesso"
            })

        } catch (error) {

            return res.status(400).json({
                mensagem: "Erro ao deletar tarefa",
                erro: error instanceof Error ? error.message : error
            })

        }

    }

}

export const genTrfController = new GenTrfController()