import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateLostAnimalUseCase } from '@/use-cases/factories/make-create-lost-animal-use-case'

export async function createLostAnimal(
  request: FastifyRequest,
  reply: FastifyReply
) {
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

  await createLostAnimalUseCase.execute({
    tutorId: request.user.sub,
    ...lostAnimalInformations,
  })

  return reply.status(201).send()
}
