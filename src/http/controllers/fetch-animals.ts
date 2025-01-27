import { makeFetchAnimalsUseCase } from '@/use-cases/factories/make-fetch-animals-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export interface FetchAnimalsResponse {
  animals: {
    name: string
    id: string
    sex: string
    weight: number
    age: string
    ageGroup: string
    species: string
    size: string
    tags: string[]
    description: string | null
    imageUrl: string | null
    created_at: Date
    ngo_id: string
  }[]
}

export async function fetchAnimals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchAnimalsBodySchema = z.object({
    state: z.string().max(2).optional(),
    city: z.string().optional(),
    animalSpecies: z.string().optional(),
    animalAge: z.string().optional(),
    animalSize: z.string().optional(),
    animalSex: z.string().optional(),
    animalNgo: z.string().optional(),
    page: z.coerce.number(),
  })

  const animalInformations = fetchAnimalsBodySchema.parse(request.query)

  const fetchAnimals = makeFetchAnimalsUseCase()

  const { animals } = await fetchAnimals.execute(animalInformations)

  return reply.status(200).send({
    animals,
  })
}
