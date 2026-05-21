import type { Prioridade, Status } from "../prisma/generated/client"
import { genTrfRepository } from "../repositories/GenTrfRepository"

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

class GenTrfService {

    async listar() {

        return await genTrfRepository.listar()

    }

    async buscarPorId(id: number) {

        const tarefa = await genTrfRepository.buscarPorId(id)

        if (!tarefa) {
            throw new Error("Tarefa não encontrada")
        }

        return tarefa

    }

    async atualizar(dadosTarefa: AtualizarTarefaDTO) {

        const tarefaExistente = await genTrfRepository.buscarPorId(dadosTarefa.id)

        if (!tarefaExistente) {
            throw new Error("Tarefa não encontrada")
        }

        if (
            dadosTarefa.data_i &&
            dadosTarefa.data_f &&
            dadosTarefa.data_f < dadosTarefa.data_i
        ) {
            throw new Error("Data final não pode ser menor que a data inicial")
        }

        return await genTrfRepository.atualizar(dadosTarefa)

    }

    async deletar(id: number) {

        const tarefaExistente = await genTrfRepository.buscarPorId(id)

        if (!tarefaExistente) {
            throw new Error("Tarefa não encontrada")
        }

        return await genTrfRepository.deletar(id)

    }

}

export const genTrfService = new GenTrfService()