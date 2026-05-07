import type { Usuario } from "../prisma/generated/client";
import { authRepository, type AuthRepository } from "../repositories/authRepository";
import { signTokenAcesso, signTokenRefresh } from "../utils/jwt";

export class AuthService {
    constructor(private readonly repository: AuthRepository){}

    async cadastrar(dadosUsuario: Usuario){
        return await this.repository.cadastrar({
            email: dadosUsuario.email,
            nome: dadosUsuario.nome,
            senha: dadosUsuario.senha 
        })
    }

    async logar(dadosUsuario: Usuario){
        const existeUsuario = await this.repository.existeUsuario(dadosUsuario.email)
        const credenciaisValidas = dadosUsuario.senha === existeUsuario?.senha

        if(existeUsuario && credenciaisValidas){
            const tokenAcesso = signTokenAcesso({
                email: existeUsuario.email,
                senha: existeUsuario.senha
            })
            const tokenRefresh = signTokenRefresh({
                email: existeUsuario.email,
                senha: existeUsuario.senha
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