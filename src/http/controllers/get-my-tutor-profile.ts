import { makeGetTutorProfileUseCase } from '@/use-cases/factories/make-get-tutor-profile-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getMyTutorProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getTutorProfile = makeGetTutorProfileUseCase()

  const { tutor } = await getTutorProfile.execute({
    tutorId: request.user.sub,
  })

  return reply.status(200).send({
    tutor: {
      ...tutor,
      password: undefined,
      created_at: undefined,
    },
  })
}
