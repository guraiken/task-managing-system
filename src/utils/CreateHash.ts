import bcrypt from "bcrypt"

const saltRound = 10;

export async function createHash(senha: string) {
    return await bcrypt.hash(senha, saltRound)
}
