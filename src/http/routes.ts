import type { FastifyInstance } from 'fastify'
import { tutorRegister } from './controllers/tutor-register'
import { tutorAuthenticate } from './controllers/tutor-authenticate'
import { ngoRegister } from './controllers/ngo-register'
import { ngoAuthenticate } from './controllers/ngo-authenticate'
import { getMyTutorProfile } from './controllers/get-my-tutor-profile'
import { verifyJwt } from './middlewares/verify-jwt'
import { getMyNgoProfile } from './controllers/get-my-ngo-profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/tutor', tutorRegister)
  app.post('/tutor/sessions', tutorAuthenticate)

  app.post('/ngo', ngoRegister)
  app.post('/ngo/sessions', ngoAuthenticate)

  // Auth Routes
  app.get('/tutor/my-profile', { onRequest: [verifyJwt] }, getMyTutorProfile)
  app.get('/ngo/my-profile', { onRequest: [verifyJwt] }, getMyNgoProfile)
}
