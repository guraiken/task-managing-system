import type { ProjetoIdentifier } from "../controller/projetoController"
import {PrismaClient, type Projeto, type Usuario} from "../prisma/generated/client"
import { prisma } from "../prisma/prisma"


export class ProjetoRepository {
    constructor(private readonly prisma :PrismaClient) {
        this.prisma = prisma
    }

    async buscar(){
        return await this.prisma.projeto.findMany({
            include: {
                membros: {select: {usuario: true}},
                tarefas: true
            }
        })
    }

    async buscarId(id:number){
        return await this.prisma.projeto.findUnique({
            where:{
                id
            },
            include: {
                membros: {select: {usuario: true}},
                tarefas: {select: {responsavel:true, dono: true, usuarios: true}}
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
            },
            include: {tarefas:true, membros:true}
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



