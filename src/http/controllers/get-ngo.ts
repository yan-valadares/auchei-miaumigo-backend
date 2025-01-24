import { makeGetNgoUseCase } from '@/use-cases/factories/make-get-ngo-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getNgo(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const getNgoProfile = makeGetNgoUseCase()

  const { ngo } = await getNgoProfile.execute({
    ngoId: id,
  })

  return reply.status(200).send({
    ngo: {
      ...ngo,
      password: undefined,
      created_at: undefined,
    },
  })
}
