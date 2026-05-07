import type { PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";


export class GerenTrfRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async lstTrfProjeto() {
        return await this.prisma.tarefa.findMany({
            include: {
                projeto: {
                    select: {
                        id: true,
                        titulo_prjt: true,
                        area: true
                    }
                }
            }
        })
    }
}

export const gerenTrfRepository = new GerenTrfRepository(prisma)