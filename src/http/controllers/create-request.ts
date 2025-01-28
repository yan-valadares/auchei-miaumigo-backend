import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EmailAlrealdyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'
import { makeCreateRequestUseCase } from '@/use-cases/factories/make-create-request-use-case'

export interface CreateRequestResponse {
  status: string
  id: string
  tutor_id: string
  animal_id: string
}
export async function createRequest(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<CreateRequestResponse> {
  const createRequestBodySchema = z.object({
    animalId: z.string(),
  })

  const requestInfomations = createRequestBodySchema.parse(req.body)

  try {
    const createRequest = makeCreateRequestUseCase()

    const { request } = await createRequest.execute({
      tutorId: req.user.sub,
      ...requestInfomations,
    })

    return reply.status(201).send({
      ...request,
    })
  } catch (err) {
    if (err instanceof WrongCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
