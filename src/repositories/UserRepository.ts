import type { PrismaClient, Usuario } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class UserRepository{
    constructor(private readonly prisma: PrismaClient){
        this.prisma = prisma
    }

    async listar(){
        return await this.prisma.usuario.findMany()
    }

    async buscarPorId(id: number){
        return await this.prisma.usuario.findUnique({
            where: {id}
        }) 
    }

    async editar(dadosUsuario: Usuario, id: number){
        const usuarioEditado = await this.prisma.usuario.update({
            data: dadosUsuario,
            where: {id}
        })
        return usuarioEditado
    }

    async deletar(id: number){
        const usuarioDeletado = await this.prisma.usuario.delete({
            where: {id}
        })
        return usuarioDeletado
    }
}

export const userRepository = new UserRepository(prisma)