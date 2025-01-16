import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { TutorAlrealdyExistsError } from '@/use-cases/errors/tutor-already-exists-error'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'
import { makeTutorRegisterUseCase } from '@/use-cases/factories/make-tutor-register-use-case'

export async function tutorRegister(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const tutorRegisterBodySchema = z.object({
    avatar: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    cpf: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    phone: z.string(),
    cep: z.string(),
    city: z.string(),
    state: z.string(),
    houseNumber: z.string(),
    houseType: z.string(),
    streetName: z.string(),
  })

  const tutorInfomations = tutorRegisterBodySchema.parse(request.body)

  try {
    const tutorRegisterUseCase = makeTutorRegisterUseCase()

    await tutorRegisterUseCase.execute(tutorInfomations)
  } catch (err) {
    if (err instanceof TutorAlrealdyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof WrongCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
