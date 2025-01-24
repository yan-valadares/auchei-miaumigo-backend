import type { FastifyInstance } from 'fastify'
import { tutorRegister } from './controllers/tutor-register'
import { tutorAuthenticate } from './controllers/tutor-authenticate'
import { ngoRegister } from './controllers/ngo-register'
import { ngoAuthenticate } from './controllers/ngo-authenticate'
import { verifyJwt } from './middlewares/verify-jwt'
import { updateTutor } from './controllers/update-tutor-profile'
import { updateNgo } from './controllers/update-ngo-profile'
import { getTutor } from './controllers/get-tutor'
import { getNgo } from './controllers/get-ngo'

export async function appRoutes(app: FastifyInstance) {
  app.post('/tutor', tutorRegister)
  app.post('/tutor/sessions', tutorAuthenticate)

  app.post('/ngo', ngoRegister)
  app.post('/ngo/sessions', ngoAuthenticate)

  // Auth Routes
  app.put('/tutor', { onRequest: [verifyJwt] }, updateTutor)
  app.get('/tutor/:id', { onRequest: [verifyJwt] }, getTutor)

  app.put('/ngo', { onRequest: [verifyJwt] }, updateNgo)
  app.get('/ngo/:id', { onRequest: [verifyJwt] }, getNgo)
}
