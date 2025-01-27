import { makeFetchNgoAnimalsUseCase } from '@/use-cases/factories/make-fetch-ngo-animals-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export interface FetchNgoAnimalsResponse {
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

export async function fetchNgoAnimals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchNgoAnimalsQuerySchema = z.object({
    animalName: z.string().optional(),
    animalSpecies: z.string().optional(),
    animalSize: z.string().optional(),
    animalSex: z.string().optional(),
    page: z.coerce.number(),
  })

  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const animalInformations = fetchNgoAnimalsQuerySchema.parse(request.query)

  console.log('id: ' + id)
  console.log('animalInformations: ' + animalInformations)

  const fetchNgoAnimals = makeFetchNgoAnimalsUseCase()

  const { animals } = await fetchNgoAnimals.execute({
    ngoId: id,
    ...animalInformations,
  })

  return reply.status(200).send({
    animals,
  })
}
