import { PrismaClient } from './generated/client/client'

export function getDb() {
  const prisma = new PrismaClient()

  return prisma
}

export type { PrismaClient } from './generated/client/client'