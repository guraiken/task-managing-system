import type { NextFunction, Request, Response } from "express"
import { verificarTokenAcesso } from "../utils/jwt"

export function auth(request: Request, response: Response, next: NextFunction) {
  const header = request.headers.authorization

  if (!header?.startsWith("Bearer ")) {
    return response.status(401).json({ error: "missing token" })
  }

  try {
    const token = header.slice("Bearer ".length)
    const payload = verificarTokenAcesso(token)

    if (!payload) {
      return response.status(401).json({ error: "invalid token" })
    }

    next()
  } catch {
    return response.status(401).json({ error: "invalid or expired token" })
  }
}
