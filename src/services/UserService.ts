import type { Token, Usuario } from "../prisma/generated/client";
import { userRepository, type UserRepository } from "../repositories/UserRepository";
import { getToken } from "../utils/jwt";

export class UserService{
    constructor(private readonly repository: UserRepository){}

    async listar(tokenUsuario: string){
        const dadosUsuarios = await this.repository.listar()
        const tokenTeste = tokenUsuario.slice("Bearer ".length)
        const tokenDecode = getToken(tokenTeste) 

        if(tokenDecode.role === 'USER') {
            throw new Error("Acesso negado")    
        }

        if(dadosUsuarios.length === 0) {
            throw new Error("Não foi encontrado nenhum usuário")
        }
        return dadosUsuarios
    }

    async buscarPorId(id: number, tokenUsuario: string){
        const usuarioExiste = await this.repository.buscarPorId(id)
        const tokenTeste = tokenUsuario.slice("Bearer ".length)
        const tokenDecode = getToken(tokenTeste) 

        if(id !== tokenDecode.id && tokenDecode.role === 'USER') {
            throw new Error("O usuário só pode ver ele mesmo")
        }

        if(!usuarioExiste){
            throw new Error("Usuário não encontrado")
        }
        return usuarioExiste
    }

    async editar(dadosUsuario: Usuario, id: number, tokenUsuario: string){
        const usuarioExiste = await this.repository.buscarPorId(id)
        const tokenTeste = tokenUsuario.slice("Bearer ".length)
        const tokenDecode = getToken(tokenTeste) 

        if(id !== tokenDecode.id && tokenDecode.role === 'USER') {
            throw new Error("O usuário só pode editar ele mesmo")
        }
        
        if(!dadosUsuario.email || !dadosUsuario.nome || !dadosUsuario.senha){
            throw new Error("usuário/nome ou senha estão vazios")
        }  
        
        if(!usuarioExiste) {      
            throw new Error("Usuário não foi encontrado")
        }

        const usuarioEditado = await this.repository.editar(dadosUsuario, id)
        return usuarioEditado
    }

    async deletar(id: number, tokenUsuario: string){
        const usuarioExiste = await this.repository.buscarPorId(id)
        const tokenTeste = tokenUsuario.slice("Bearer ".length)
        const tokenDecode = getToken(tokenTeste) 

        if(id !== tokenDecode.id && tokenDecode.role === 'USER') {
            throw new Error("O usuário só pode deletar ele mesmo")
        }

        if(!usuarioExiste){
            throw new Error("Usuário não encontrado")
        }

        const usuarioDeletado = await this.repository.deletar(id)
        return usuarioDeletado
    }
}

export const userService = new UserService(userRepository)
