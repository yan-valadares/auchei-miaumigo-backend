import { makeGetAnimalUseCase } from '@/use-cases/factories/make-get-animal-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getAnimal(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const getAnimal = makeGetAnimalUseCase()

  const { animal } = await getAnimal.execute({
    animalId: id,
  })

  return reply.status(200).send({
    animal: {
      ...animal,
      created_at: undefined,
    },
  })
}
