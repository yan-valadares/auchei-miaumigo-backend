import { makeDeleteAnimalUseCase } from '@/use-cases/factories/make-delete-animal-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function deleteAnimal(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const deleteAnimal = makeDeleteAnimalUseCase()

  await deleteAnimal.execute({
    animalId: id,
    ngoId: request.user.sub,
  })

  return reply.status(204)
}
