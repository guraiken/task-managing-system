import { PrismaClient, type Prioridade, type Status } from "../prisma/generated/client"
import { prisma } from "../prisma/prisma"

type AtualizarTarefaDTO = {
    id: number
    titulo_trf?: string
    descr?: string
    data_i?: Date
    data_f?: Date
    prioridade?: Prioridade
    status?: Status

    projeto_id?: number
    dono_id?: number
    resp_id?: number

    usuariosIds?: number[]
}

export class GenTrfRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async listar() {

        return await this.prisma.tarefa.findMany({
            include: {
                projeto: true,
                dono: true,
                responsavel: true,
                usuarios: {
                    include: {
                        usuario: true
                    }
                }
            }
        })

    }

    async buscarPorId(id: number) {

        return await this.prisma.tarefa.findUnique({
            where: {
                id
            },
            include: {
                projeto: true,
                dono: true,
                responsavel: true,
                usuarios: {
                    include: {
                        usuario: true
                    }
                }
            }
        })

    }

    async atualizar(dadosTarefa: AtualizarTarefaDTO) {

        const tarefaAtualizada = await this.prisma.tarefa.update({

            where: {
                id: dadosTarefa.id
            },

            data: {

                ...(dadosTarefa.titulo_trf !== undefined && {
                    titulo_trf: dadosTarefa.titulo_trf
                }),

                ...(dadosTarefa.descr !== undefined && {
                    descr: dadosTarefa.descr
                }),

                ...(dadosTarefa.data_i !== undefined && {
                    data_i: dadosTarefa.data_i
                }),

                ...(dadosTarefa.data_f !== undefined && {
                    data_f: dadosTarefa.data_f
                }),

                ...(dadosTarefa.prioridade !== undefined && {
                    prioridade: dadosTarefa.prioridade
                }),

                ...(dadosTarefa.status !== undefined && {
                    status: dadosTarefa.status
                }),

                ...(dadosTarefa.projeto_id !== undefined && {
                    projeto: {
                        connect: {
                            id: dadosTarefa.projeto_id
                        }
                    }
                }),

                ...(dadosTarefa.dono_id !== undefined && {
                    dono: {
                        connect: {
                            id: dadosTarefa.dono_id
                        }
                    }
                }),

                ...(dadosTarefa.resp_id !== undefined && {
                    responsavel: {
                        connect: {
                            id: dadosTarefa.resp_id
                        }
                    }
                })

            },

            include: {
                projeto: true,
                dono: true,
                responsavel: true,
                usuarios: {
                    include: {
                        usuario: true
                    }
                }
            }
        })

        if (dadosTarefa.usuariosIds) {

            await this.prisma.usuarioEmTarefa.deleteMany({
                where: {
                    tarefaId: dadosTarefa.id
                }
            })

            await this.prisma.usuarioEmTarefa.createMany({
                data: dadosTarefa.usuariosIds.map((usuarioId) => ({
                    tarefaId: dadosTarefa.id,
                    usuarioId
                }))
            })

        }

        return tarefaAtualizada

    }

    async deletar(id: number) {

        await this.prisma.usuarioEmTarefa.deleteMany({
            where: {
                tarefaId: id
            }
        })

        const tarefaDeletada = await this.prisma.tarefa.delete({
            where: {
                id
            }
        })

        return tarefaDeletada

    }

}

export const genTrfRepository = new GenTrfRepository(prisma)