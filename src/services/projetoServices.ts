import type { ProjetoRepository } from "../repositories/projetoRepository";

export class ProjetoServices {
    constructor(private readonly repository: ProjetoRepository) {
        this.repository
    }

    async buscar() {
        const data = await this.repository.buscar()

        if (data.length === 0) {

            return {
                message: "Projetos não encontrados",
                data
            }
        }


        return {
            message: "Projetos encontrados",
            data
        }
    }


 async buscarId(id: number){

    return {
        message: "Projeto encontrado",
        data: await this.repository.buscarId(id)
    }

}





}