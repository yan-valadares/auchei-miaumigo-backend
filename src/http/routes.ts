import type { FastifyInstance } from 'fastify'
import { tutorRegister } from './tutor-register'
import { tutorAuthenticate } from './tutor-authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/tutor', tutorRegister)
  app.post('/tutor/sessions', tutorAuthenticate)
}
