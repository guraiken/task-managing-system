import { gerenTrfRepository, type GerenTrfRepository } from "../repository/GerenTrfRepository"



export class GerenTrfService{
    constructor(private readonly repository: GerenTrfRepository){}

    async lstTrfProjeto(){
        return await this.repository.lstTrfProjeto()
    }
}

export const gerenTrfService = new GerenTrfService(gerenTrfRepository)