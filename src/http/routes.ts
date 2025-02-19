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
import { fetchNgos } from './controllers/fetch-ngos'
import { fetchOldestLostAnimals } from './controllers/fetch-oldest-lost-animals'
import { createRequest } from './controllers/create-request'
import { approveRequest } from './controllers/approve-request'
import { refuseRequest } from './controllers/refuse-request'
import { fetchNgoRequests } from './controllers/fetch-ngo-requests'

export async function appRoutes(app: FastifyInstance) {
  app.post('/tutor', tutorRegister)
  app.post('/tutor/sessions', tutorAuthenticate)

  app.post('/ngo', ngoRegister)
  app.post('/ngo/sessions', ngoAuthenticate)

  app.get('/lost-animals/:id', getLostAnimal)
  app.get('/lost-animals', fetchLostAnimals)
  app.get('/lost-animals/oldest', fetchOldestLostAnimals)

  // Auth Routes
  app.put('/tutor', { onRequest: [verifyJwt] }, updateTutor)
  app.get('/tutor/:id', { onRequest: [verifyJwt] }, getTutor)
  app.post('/lost-animals', { onRequest: [verifyJwt] }, createLostAnimal)
  app.post('/requests', { onRequest: [verifyJwt] }, createRequest)

  app.put('/ngo', { onRequest: [verifyJwt] }, updateNgo)
  app.get('/ngo/:id', { onRequest: [verifyJwt] }, getNgo)
  app.get('/ngos', { onRequest: [verifyJwt] }, fetchNgos)
  app.post('/animals', { onRequest: [verifyJwt] }, createAnimal)
  app.get('/my-animals/:id', { onRequest: [verifyJwt] }, fetchNgoAnimals)
  app.get('/my-requests/:id', { onRequest: [verifyJwt] }, fetchNgoRequests)
  app.delete('/animals', { onRequest: [verifyJwt] }, deleteAnimal)
  app.put('/requests/approve', { onRequest: [verifyJwt] }, approveRequest)
  app.put('/requests/refuse', { onRequest: [verifyJwt] }, refuseRequest)

  app.get('/animals/:id', { onRequest: [verifyJwt] }, getAnimal)
  app.get('/animals', { onRequest: [verifyJwt] }, fetchAnimals)
}
