import type { Projeto, Usuario } from "../prisma/generated/client";
import type { ProjetoRepository } from "../repositories/projetoRepository";

export class ProjetoServices {
    constructor(private readonly repository: ProjetoRepository) {
        this.repository
    }

    async buscar() {
        const data = await this.repository.buscar()

        if (data.length === 0) {

            return {
                message: "Sem projetos cadastrados",
                data
            }
        }


        return {
            message: "Projetos encontrados",
            data
        }
    }


    async buscarId(id: number) {

        const data = await this.repository.buscarId(id)

        if (!data) {

            return {
                message: "Projeto não encontrado",
                data
            }

        }


        return {
            message: "Projeto encontrado",
            data
        }

    }


    async criar(dadosProjeto: Omit<Projeto, "id">, idUsuario: number) {

        const data = await this.repository.criar(dadosProjeto)


        if (!data) {

            return {
                message: "Projeto não criado",
                data
            }
        }

        const criarRelacao = await this.repository.criarRelacao(data.id, idUsuario)

        if (!criarRelacao) {


            return {
                message: "Projeto criado relação deu erro",
                data
            }

        }

        const projetoCriado = await this.buscarId(data.id)


        return {
            message: "Projeto criado",
            data: projetoCriado.data
        }


    }

    async deletar(id: number) {

        const buscar = await this.buscarId(id)

        if (!buscar.data) {

            return {
                message: "Projeto não encontrado",
                data: undefined
            }
        }

        const deletar = await this.repository.deletar(id)

        return {
            message: "Projeto deletado",
            data: undefined
        }

    }

    async atualizar(dadosProjeto: Projeto) {


        const buscar = await this.buscarId(dadosProjeto.id)

        if (!buscar.data) {

            return {
                message: "Projeto não encontrado",
                data: undefined
            }
        }


        const atualizando = await this.repository.atualizar(dadosProjeto)



        return {
            message: "Projeto atualizado",
            data: atualizando
        }


    }








}