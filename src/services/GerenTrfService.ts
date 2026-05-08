import type { Prioridade, Status } from "../prisma/generated/prisma/enums";
import { gerenTrfRepository, type GerenTrfRepository } from "../repository/GerenTrfRepository";

export class GerenTrfService {
    constructor(private readonly repository: GerenTrfRepository) { }

    async lstProjetoComTarefas() {
        return await this.repository.lstProjetoComTarefas();
    }

    async lstTarefasProjeto(id: number) {
        return await this.repository.lstTarefasProjeto(id);
    }

    async buscarTarefaPorId(id: number) {
        return await this.repository.buscarTarefaPorId(id);
    }

    async editarTarefa(
        id: number,
        dados: {
            resp_id?: number
            status?: Status
            prioridade?: Prioridade
            data_f?: Date
        }
    ) {
        return await this.repository.editarTarefa(id, dados);
    }

    async deletarTarefa(id: number) {
    return await this.repository.deletarTarefa(id);
}
}

export const gerenTrfService = new GerenTrfService(gerenTrfRepository);