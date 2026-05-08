import { gerenTrfRepository, type GerenTrfRepository } from "../repository/GerenTrfRepository";

export class GerenTrfService {
    constructor(private readonly repository: GerenTrfRepository) {}

    async lstProjetoComTarefas() {
        return await this.repository.lstProjetoComTarefas();
    }
}

export const gerenTrfService = new GerenTrfService(gerenTrfRepository);