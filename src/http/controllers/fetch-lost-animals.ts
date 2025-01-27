import { makeFetchLostAnimalsUseCase } from '@/use-cases/factories/make-fetch-lost-animals-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export interface FetchLostAnimalsResponse {
  lostAnimals: {
    name: string
    id: string
    created_at: Date
    tutor_id: string
    state: string
    city: string
    lastPlaceSeen: string
    lostDate: Date
    sex: string
    imageUrl: string | null
  }[]
}

export async function fetchLostAnimals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchLostAnimalsQuerySchema = z.object({
    state: z.string().max(2).optional(),
    city: z.string().optional(),
    page: z.coerce.number().default(1),
  })

  const animalInformations = fetchLostAnimalsQuerySchema.parse(request.query)

  const fetchLostAnimals = makeFetchLostAnimalsUseCase()

  const { lostAnimals } = await fetchLostAnimals.execute(animalInformations)

  return reply.status(200).send({
    lostAnimals,
  })
}
