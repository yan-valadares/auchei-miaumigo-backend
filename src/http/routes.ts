import type { FastifyInstance } from 'fastify'
import { tutorRegister } from './tutor-register-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/tutor', tutorRegister)
}
