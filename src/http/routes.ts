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
import { createAnimal } from './controllers/create-animal'
import { createLostAnimal } from './controllers/create-lost-animal'
import { getAnimal } from './controllers/get-animal'
import { getLostAnimal } from './controllers/get-lost-animal'
import { fetchAnimals } from './controllers/fetch-animals'
import { fetchLostAnimals } from './controllers/fetch-lost-animals'
import { fetchNgoAnimals } from './controllers/fetch-ngo-animals'
import { deleteAnimal } from './controllers/delete-animal'

export async function appRoutes(app: FastifyInstance) {
  app.post('/tutor', tutorRegister)
  app.post('/tutor/sessions', tutorAuthenticate)

  app.post('/ngo', ngoRegister)
  app.post('/ngo/sessions', ngoAuthenticate)

  app.get('/lost-animals/:id', getLostAnimal)
  app.get('/lost-animals', fetchLostAnimals)

  // Auth Routes
  app.put('/tutor', { onRequest: [verifyJwt] }, updateTutor)
  app.get('/tutor/:id', { onRequest: [verifyJwt] }, getTutor)
  app.post('/lost-animals', { onRequest: [verifyJwt] }, createLostAnimal)

  app.put('/ngo', { onRequest: [verifyJwt] }, updateNgo)
  app.get('/ngo/:id', { onRequest: [verifyJwt] }, getNgo)
  app.post('/animals', { onRequest: [verifyJwt] }, createAnimal)
  app.get('/my-animals/:id', { onRequest: [verifyJwt] }, fetchNgoAnimals)
  app.delete('/animals/:id', { onRequest: [verifyJwt] }, deleteAnimal)

  app.get('/animals/:id', { onRequest: [verifyJwt] }, getAnimal)
  app.get('/animals', { onRequest: [verifyJwt] }, fetchAnimals)
}
