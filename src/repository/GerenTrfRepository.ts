import type { PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class GerenTrfRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async lstProjetoComTarefas() {
        return await this.prisma.projeto.findMany({
            select: {
                id: true,
                titulo_prjt: true,
                area: true,

                tarefa: {
                    select: {
                        id: true,
                        titulo_trf: true,
                        descr: true,
                        status: true
                    }
                }
            }
        });
    }
}

export const gerenTrfRepository = new GerenTrfRepository(prisma);