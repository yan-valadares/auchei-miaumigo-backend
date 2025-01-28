import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'
import { makeApproveRequestUseCase } from '@/use-cases/factories/make-approve-request-use-case'

export interface ApproveRequestResponse {
  status: string
  id: string
  tutor_id: string
  animal_id: string
}
export async function approveRequest(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<ApproveRequestResponse> {
  const approveRequestParamsSchema = z.object({
    requestId: z.string(),
  })

  const requestInfomations = approveRequestParamsSchema.parse(req.params)

  try {
    const approveRequest = makeApproveRequestUseCase()

    await approveRequest.execute({
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
