import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateAnimalUseCase } from '@/use-cases/factories/make-create-animal-use-case'

export interface CreateAnimalResponse {
  name: string
  sex: string
  weight: number
  age: string
  ageGroup: string
  species: string
  size: string
  tags: string[]
  imageUrl: string | null
  description: string | null
  id: string
  created_at: Date
  ngo_id: string
}
export async function createAnimal(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<CreateAnimalResponse> {
  const createAnimalBodySchema = z.object({
    name: z.string(),
    sex: z.string(),
    weight: z.number(),
    age: z.string(),
    ageGroup: z.string(),
    species: z.string(),
    size: z.string(),
    tags: z.array(z.string()),
    imageUrl: z.string().nullable(),
    description: z.string().nullable(),
  })

  const animalInformations = createAnimalBodySchema.parse(request.body)

  const createAnimalUseCase = makeCreateAnimalUseCase()

  const { animal } = await createAnimalUseCase.execute({
    ngoId: request.user.sub,
    ...animalInformations,
  })

  return reply.status(201).send({
    animal,
  })
}
