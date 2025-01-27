import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EmailAlrealdyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'
import { makeUpdateTutorUseCase } from '@/use-cases/factories/make-update-tutor-use-case'

export async function updateTutor(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateTutorBodySchema = z.object({
    avatar: z.string().optional().optional(),
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    email: z.string().email().optional(),
    cpf: z.string().min(11).max(11).optional(),
    phone: z.string().min(10).optional(),
    cep: z.string().min(8).max(8).optional(),
    city: z.string().optional(),
    state: z.string().min(2).max(2).optional(),
    houseNumber: z.string().max(4).optional(),
    houseType: z.enum(['house', 'apartment']).optional(),
    streetName: z.string().optional(),
  })

  const tutorInfomations = updateTutorBodySchema.parse(request.body)

  try {
    const updateTutorUseCase = makeUpdateTutorUseCase()

    const { updatedTutor } = await updateTutorUseCase.execute({
      id: request.user.sub,
      ...tutorInfomations,
    })

    return reply.status(200).send({
      ...updatedTutor,
      password: undefined,
    })
  } catch (err) {
    if (err instanceof EmailAlrealdyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof WrongCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
