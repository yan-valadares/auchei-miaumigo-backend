import { makeGetNgoProfileUseCase } from '@/use-cases/factories/make-get-ngo-profile-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getMyNgoProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getNgoProfile = makeGetNgoProfileUseCase()

  const { ngo } = await getNgoProfile.execute({
    ngoId: request.user.sub,
  })

  return reply.status(200).send({
    ngo: {
      ...ngo,
      password: undefined,
      created_at: undefined,
    },
  })
}
