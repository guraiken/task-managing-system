import type { Prioridade, PrismaClient, Status } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class GerenTrfRepository {
    constructor(private readonly prisma: PrismaClient) { }

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

    async lstTarefasProjeto(id: number) {
        return await this.prisma.projeto.findUnique({
            where: {
                id
            },

            select: {
                id: true,
                titulo_prjt: true,
                area: true,
                descr: true,

                tarefas: {
                    select: {
                        id: true,
                        titulo_trf: true,
                        descr: true,
                        status: true,
                        prioridade: true,
                        data_i: true,
                        data_v: true,
                        data_f: true
                    }
                }
            }
        });
    }

    async buscarTarefaPorId(id: number) {
        return await this.prisma.tarefa.findUnique({
            where: {
                id
            },

            select: {
                id: true,
                titulo_trf: true,
                descr: true,
                status: true,
                prioridade: true,
                nivel_acesso: true,
                data_i: true,
                data_v: true,
                data_f: true,

                projeto: {
                    select: {
                        id: true,
                        titulo_prjt: true,
                        area: true
                    }
                },

                dono: {
                    select: {
                        id: true,
                        nome: true,
                        nivel_acesso: true
                    }
                },

                responsavel: {
                    select: {
                        id: true,
                        nome: true,
                        nivel_acesso: true
                    }
                }
            }
        });
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
        return await this.prisma.tarefa.update({
            where: {
                id
            },

            data: {
                resp_id: dados.resp_id,
                status: dados.status,
                prioridade: dados.prioridade,
                data_f: dados.data_f
            }
        });
    }

    async deletarTarefa(id: number) {
        return await this.prisma.tarefa.delete({
            where: {
                id
            }
        });
    }
}

export const gerenTrfRepository = new GerenTrfRepository(prisma);