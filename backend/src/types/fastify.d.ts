import { PrismaClient } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }

  interface FastifyRequest {
    user?: {
      id: string
      email: string
      role: string
      name: string
    }
  }
}