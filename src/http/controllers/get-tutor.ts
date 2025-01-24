import { makeGetTutorUseCase } from '@/use-cases/factories/make-get-tutor-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getTutor(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const getTutor = makeGetTutorUseCase()

  const { tutor } = await getTutor.execute({
    tutorId: id,
  })

  return reply.status(200).send({
    tutor: {
      ...tutor,
      password: undefined,
      created_at: undefined,
    },
  })
}
