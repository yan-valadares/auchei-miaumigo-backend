import { makeDeleteAnimalUseCase } from '@/use-cases/factories/make-delete-animal-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function deleteAnimal(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    animalId: z.string().uuid(),
  })

  const { animalId } = bodySchema.parse(request.body)

  const deleteAnimal = makeDeleteAnimalUseCase()

  await deleteAnimal.execute({
    animalId,
    ngoId: request.user.sub,
  })

  return reply.status(204)
}
