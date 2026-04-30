import { PrismaClient } from "../prisma/generated/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = "postgresql://postgres:senai@localhost:5432/task-db?schema=public"

const adapter = new PrismaPg({connectionString})
export const prisma = new PrismaClient({adapter, log: ['query'] })