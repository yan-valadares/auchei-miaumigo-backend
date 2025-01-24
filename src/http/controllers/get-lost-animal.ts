import { makeGetLostAnimalUseCase } from '@/use-cases/factories/make-get-lost-animal-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getLostAnimal(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const getLostAnimal = makeGetLostAnimalUseCase()

  console.log(id)

  const { lostAnimal } = await getLostAnimal.execute({
    lostAnimalId: id,
  })

  console.log(lostAnimal)

  return reply.status(200).send({
    lostanimal: {
      ...lostAnimal,
      created_at: undefined,
    },
  })
}
