import jwt from "jsonwebtoken"
import { env } from "../env"

export function verificarTokenAcesso(token: string) {
  return jwt.verify(token, env.chaveAcesso)
}

export function verificarTokenRefresh(token: string) {
  return jwt.verify(token, env.chaveRefresh)
}
