import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateLostAnimalUseCase } from '@/use-cases/factories/make-create-lost-animal-use-case'

export interface CreateLostAnimalInterface {
  name: string
  sex: string
  imageUrl: string | null
  state: string
  city: string
  lastPlaceSeen: string
  lostDate: Date
  id: string
  created_at: Date
  tutor_id: string
}
export async function createLostAnimal(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<CreateLostAnimalInterface> {
  const createLostAnimalBodySchema = z.object({
    name: z.string(),
    sex: z.string(),
    imageUrl: z.string().nullable(),
    state: z.string().max(2),
    city: z.string(),
    lastPlaceSeen: z.string(),
    lostDate: z.string(),
  })

  const lostAnimalInformations = createLostAnimalBodySchema.parse(request.body)

  const createLostAnimalUseCase = makeCreateLostAnimalUseCase()

  const { lostAnimal } = await createLostAnimalUseCase.execute({
    tutorId: request.user.sub,
    ...lostAnimalInformations,
  })

  return reply.status(201).send({
    lostAnimal,
  })
}
