import type { Usuario } from "../prisma/generated/client";
import { userRepository, type UserRepository } from "../repositories/UserRepository";

export class UserService{
    constructor(private readonly repository: UserRepository){}

    async listar(){
        const dadosUsuarios = await this.repository.listar()

        if(dadosUsuarios.length === 0) {
            throw new Error("Não foi encontrado nenhum usuário")
        }
        return dadosUsuarios
    }

    async buscarPorId(id: number){
        const usuarioExiste = await this.repository.buscarPorId(id)

        if(!usuarioExiste){
            throw new Error("Usuário não encontrado")
        }
        return usuarioExiste
    }

    async editar(dadosUsuario: Usuario){
        const usuarioExiste = await this.repository.buscarPorId(dadosUsuario.id)

        if(!dadosUsuario.email || !dadosUsuario.nome || !dadosUsuario.senha){
            throw new Error("usuário/nome ou senha estão vazios")
        }  

        if(!usuarioExiste) {      
            throw new Error("Usuário não foi encontrado")
        }

        const usuarioEditado = await this.repository.editar(dadosUsuario)
        return usuarioEditado
    }

    async deletar(id: number){
        const usuarioExiste = await this.repository.buscarPorId(id)

        if(!usuarioExiste){
            throw new Error("Usuário não encontrado")
        }

        const usuarioDeletado = await this.repository.deletar(id)
        return usuarioDeletado
    }
}

export const userService = new UserService(userRepository)
