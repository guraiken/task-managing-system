import type { PrismaClient, Token } from "../prisma/generated/client";
import type { Usuario } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";


export class AuthRepository{
    constructor(private readonly prisma: PrismaClient){
        this.prisma = prisma
    }

    async cadastrar(dadosUsuario: Partial<Usuario>) {
        return await this.prisma.usuario.create({
            data: {
                email: dadosUsuario.email || "",
                nome: dadosUsuario.nome || "",
                senha: dadosUsuario.senha || "",
                role: dadosUsuario.role || "USER"
            }
        })
    }

    async existeUsuario(email: string){
        return await this.prisma.usuario.findUnique({
            where: {email: email}
        })
    }

    async criarToken(dadosToken: Omit<Token, "id" | "revoked">){
        return await this.prisma.token.create({
            data: dadosToken
        })
    }
}

export const authRepository = new AuthRepository(prisma)