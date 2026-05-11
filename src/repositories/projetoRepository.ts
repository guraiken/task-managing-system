import {PrismaClient, type Projeto, type Usuario} from "../prisma/generated/client"
import { prisma } from "../prisma/prisma"


export class ProjetoRepository {
    constructor(private readonly prisma :PrismaClient) {
        this.prisma = prisma
    }

    async buscar(){
        return await this.prisma.projeto.findMany()
    }

    async buscarId(id:number){
        return await this.prisma.projeto.findUnique({
            where:{
                id
            }
        })
    }

    async criar(dadosProjeto:Omit<Projeto, "id">) {

        const criando = await this.prisma.projeto.create({
            data:{
                ...dadosProjeto
            }
        })
        
        return criando

    }

    async criarRelacao(idProjeto:number,idUsuario:number) {

        const criandoRelacao= await this.prisma.usuarioEmProjeto.create({
            data:{
                projetoId:idProjeto,
                usuarioId:idUsuario

           }
        })

        return criandoRelacao
        
    }

    async deletar(id:number) {

        const deletendo = await this.prisma.projeto.delete({
            where:{
                id:id
            }
        })

        return deletendo
        
    }

    async atualizar(dadosProjeto:Projeto){

        const atualizando = await this.prisma.projeto.update({
            data:{
                ...dadosProjeto
            },
            where:{
                id:dadosProjeto.id
            }
        })

        return atualizando


    }


}

export const projetoRepository = new ProjetoRepository(prisma)



