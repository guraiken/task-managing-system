import type { Request, Response } from "express";
import { gerenTrfService, type GerenTrfService } from "../services/GerenTrfService";


class GerenTrfController {
    constructor(private readonly service: GerenTrfService) {}

    async lstTrfProjet(req: Request, res: Response) {
        try {
            const lstTrfs = await this.service.lstTrfProjeto()

            return res.status(200).json({
                message: "Lista das Terefas",
                data: lstTrfs
            })
        } catch (error){
            console.log(error);
            return res.status(500).json({
                message: "Erro ao listar exames"
            });
        }
    }
}

export const gerenTrfController = new GerenTrfController(gerenTrfService);