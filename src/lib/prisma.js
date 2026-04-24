import { PrismaClient } from '@/generated/prisma/client'
import path from 'path'

const globalForPrisma = globalThis

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma