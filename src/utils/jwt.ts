import jwt from 'jsonwebtoken'
import { env } from '../env'
import type { Role, Usuario } from '../prisma/generated/client'

interface Token extends Usuario {
    role?: Role,
    iat: number,
    exp: number
}


export function signTokenAcesso(payload: Partial<Usuario>) {
    return jwt.sign(payload, env.chaveAcesso, {
        expiresIn: '1h'
    })
}

export function signTokenRefresh(payload: Partial<Usuario>) {
    return jwt.sign(payload, env.chaveRefresh, {
        expiresIn: '30d'
    })
}

export function verificarTokenAcesso(token: string) {
    return jwt.verify(token, env.chaveAcesso)
}
export function verificarTokenRefresh(token: string) {
    return jwt.verify(token, env.chaveRefresh)
}

export function getToken(token: string): Token {
    return jwt.decode(token) as Token;
}
