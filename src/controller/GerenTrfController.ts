import type { Request, Response } from "express";
import { gerenTrfService, type GerenTrfService } from "../services/GerenTrfService";

class GerenTrfController {
    constructor(private readonly service: GerenTrfService) { }

    async lstProjetoComTarefas(req: Request, res: Response) {
        try {
            const projetos = await this.service.lstProjetoComTarefas();

            return res.status(200).json({
                message: "Projetos com tarefas",
                data: projetos
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Erro ao listar projetos"
            });
        }
    }

    async lstTarefasProjeto(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const projeto = await this.service.lstTarefasProjeto(Number(id));

            if (!projeto) {
                return res.status(404).json({
                    message: "Projeto não encontrado"
                });
            }

            return res.status(200).json({
                message: "Tarefas do projeto",
                data: projeto
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Erro ao listar tarefas do projeto"
            });
        }
    }

    async buscarTarefaPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const tarefa = await this.service.buscarTarefaPorId(Number(id));

            if (!tarefa) {
                return res.status(404).json({
                    message: "Tarefa não encontrada"
                });
            }

            return res.status(200).json({
                message: "Tarefa encontrada",
                data: tarefa
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Erro ao buscar tarefa"
            });
        }
    }

    async editarTarefa(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const {
                resp_id,
                status,
                prioridade,
                data_f
            } = req.body;

            const dados: any = {};

            if (resp_id !== undefined) {
                dados.resp_id = resp_id;
            }

            if (status !== undefined) {
                dados.status = status;
            }

            if (prioridade !== undefined) {
                dados.prioridade = prioridade;
            }

            if (data_f !== undefined) {
                dados.data_f = new Date(data_f);
            }

            const tarefa = await this.service.editarTarefa(
                Number(id),
                dados
            );

            return res.status(200).json({
                message: "Tarefa atualizada",
                data: tarefa
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                message: "Erro ao editar tarefa"
            });
        }
    }

    async deletarTarefa(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const tarefa = await this.service.deletarTarefa(
                Number(id)
            );

            return res.status(200).json({
                message: "Tarefa deletada",
                data: tarefa
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                message: "Erro ao deletar tarefa"
            });
        }
    }
}

export const gerenTrfController = new GerenTrfController(gerenTrfService);