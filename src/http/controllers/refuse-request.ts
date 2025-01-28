import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'
import { makeRefuseRequestUseCase } from '@/use-cases/factories/make-refuse-request-use-case'

export interface RefuseRequestResponse {
  status: string
  id: string
  tutor_id: string
  animal_id: string
}
export async function refuseRequest(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<RefuseRequestResponse> {
  const refuseRequestParamsSchema = z.object({
    requestId: z.string(),
  })

  const requestInfomations = refuseRequestParamsSchema.parse(req.params)

  try {
    const refuseRequest = makeRefuseRequestUseCase()

    await refuseRequest.execute({
      ngoId: req.user.sub,
      ...requestInfomations,
    })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof WrongCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
