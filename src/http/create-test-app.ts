import fastify from 'fastify'
import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { appRoutes } from './routes'
import { env } from '@/env'

export function createApp(): FastifyInstance {
  const app = fastify()

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  })

  app.register(appRoutes)

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
      console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  })

  return app
}
