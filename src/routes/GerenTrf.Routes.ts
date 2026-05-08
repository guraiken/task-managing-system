import { Router } from "express";
import { gerenTrfController } from "../controller/GerenTrfController";

export const gerenTrfRouter = Router();

gerenTrfRouter.get("/gerenTrf", (req, res) => {
    return gerenTrfController.lstProjetoComTarefas(req, res);
});