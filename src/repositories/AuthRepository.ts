import type { PrismaClient } from "@prisma/client/extension";
import type { Usuario } from "../prisma/generated/client";


export class AuthRepository{
    constructor(private readonly prisma: PrismaClient){
        this.prisma = prisma
    }

    async cadastrar(dadosUsuario: Partial<Usuario>) {
        return this.prisma.usuario.create({
            
        })
    }
}