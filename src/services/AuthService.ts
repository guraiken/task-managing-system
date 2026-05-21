import { createHash } from "../utils/createHash";
import bcrypt from "bcrypt";
import type { Usuario } from "../prisma/generated/client";
import { authRepository, type AuthRepository } from "../repositories/AuthRepository";
import { signTokenAcesso, signTokenRefresh } from "../utils/jwt";

export class AuthService {
    constructor(private readonly repository: AuthRepository){}

    async cadastrar(dadosUsuario: Usuario){
        const hash = await createHash(dadosUsuario.senha)

        switch (true){
            case (!dadosUsuario.nome || !dadosUsuario.email):
                throw new Error("Usuario necessita de um nome e email")
                break
            case (!dadosUsuario.email.includes("@")):
                throw new Error("Email inválido")
                break
        }

        const usuarioCriado = this.repository.cadastrar({
            email: dadosUsuario.email,
            nome: dadosUsuario.nome,
            senha: hash,
            role: dadosUsuario.role || null
        })
        return usuarioCriado
    }

    async logar(dadosUsuario: Usuario){
        const existeUsuario = await this.repository.existeUsuario(dadosUsuario.email)
        const credenciaisValidas = await bcrypt.compare(dadosUsuario.senha || "", existeUsuario?.senha || "")

        if(existeUsuario && credenciaisValidas){
            const tokenAcesso = signTokenAcesso({
                id: existeUsuario.id,
                email: existeUsuario.email,
                senha: existeUsuario.senha,
                role: existeUsuario.role
            })
            const tokenRefresh = signTokenRefresh({
                id: existeUsuario.id,
                email: existeUsuario.email,
                senha: existeUsuario.senha,
                role: existeUsuario.role
            }) 

            //refresh create
            const refreshExpires = new Date()
            const refreshExpiresUpdated = refreshExpires.setMonth(refreshExpires.getMonth() + 1)

            await this.repository.criarToken({
                token: tokenRefresh,
                expiresAt: new Date(refreshExpiresUpdated),
                type: 'REFRESH',
                usuarioId: existeUsuario.id
            })

            return {
                tokenAcesso,
                tokenRefresh
            }
        }
        
        throw new Error("Credenciais inválidas")
    }
}

export const authService = new AuthService(authRepository)