import { Router } from "express";
import { gerenTrfController } from "../controller/GerenTrfController";

export const gerenTrfRouter = Router();

gerenTrfRouter.get("/gerenTrf", (req, res) => {
    return gerenTrfController.lstProjetoComTarefas(req, res);
});

gerenTrfRouter.get("/gerenTrf/projeto/:id", (req, res) => {
    return gerenTrfController.lstTarefasProjeto(req, res);
});

gerenTrfRouter.get("/gerenTrf/tarefa/:id", (req, res) => {
    return gerenTrfController.buscarTarefaPorId(req, res);
});

gerenTrfRouter.put("/gerenTrf/tarefa/:id", (req, res) => {
    return gerenTrfController.editarTarefa(req, res);
});

gerenTrfRouter.delete("/gerenTrf/tarefa/:id", (req, res) => {
    return gerenTrfController.deletarTarefa(req, res);
});