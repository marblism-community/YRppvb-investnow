import { Configuration } from '@/core/configuration'
import { PrismaClient } from '@prisma/client'

const createPrismaClient = () => {
  return new PrismaClient({
    log: Configuration.isDevelopment ? ['query', 'error', 'warn'] : ['error'],
  })
}

class Singleton {
  static prisma = createPrismaClient()
}

export const DatabaseUnprotected = Singleton.prisma
