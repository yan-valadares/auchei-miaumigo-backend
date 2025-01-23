import type { FastifyInstance } from 'fastify'
import { tutorRegister } from './controllers/tutor-register'
import { tutorAuthenticate } from './controllers/tutor-authenticate'
import { ngoRegister } from './controllers/ngo-register'
import { ngoAuthenticate } from './controllers/ngo-authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/tutor', tutorRegister)
  app.post('/tutor/sessions', tutorAuthenticate)

  app.post('/ngo', ngoRegister)
  app.post('/ngo/sessions', ngoAuthenticate)
}
