import {PrismaClient} from "../prisma/generated/client"


class ProjetoRepository {
    constructor(private readonly prisma :PrismaClient) {
        this.prisma = prisma
    }


}



