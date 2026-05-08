import type { Request, Response } from "express";
import { gerenTrfService, type GerenTrfService } from "../services/GerenTrfService";

class GerenTrfController {
    constructor(private readonly service: GerenTrfService) {}

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
}

export const gerenTrfController = new GerenTrfController(gerenTrfService);