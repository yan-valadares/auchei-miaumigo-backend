import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EmailAlrealdyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'
import { makeTutorRegisterUseCase } from '@/use-cases/factories/make-tutor-register-use-case'

export async function tutorRegister(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const tutorRegisterBodySchema = z.object({
    avatar: z.string(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    cpf: z.string().min(11).max(11),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    phone: z.string().min(10),
    cep: z.string().min(8).max(8),
    city: z.string(),
    state: z.string().min(2).max(2),
    houseNumber: z.string().max(4),
    houseType: z.enum(['house', 'apartment']),
    streetName: z.string(),
  })

  const tutorInfomations = tutorRegisterBodySchema.parse(request.body)

  try {
    const tutorRegisterUseCase = makeTutorRegisterUseCase()

    const { tutor } = await tutorRegisterUseCase.execute(tutorInfomations)

    return reply.status(201).send({
      ...tutor,
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
