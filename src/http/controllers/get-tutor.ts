import { makeGetTutorProfileUseCase } from '@/use-cases/factories/make-get-tutor-profile-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getTutor(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const getTutorProfile = makeGetTutorProfileUseCase()

  const { tutor } = await getTutorProfile.execute({
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
