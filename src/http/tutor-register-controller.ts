import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { TutorRegisterUseCase } from '@/use-cases/tutor-register'
import { PrismaTutorsRepository } from '@/repositories/prisma/prisma-tutors-repository'
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { TutorAlrealdyExistsError } from '@/use-cases/errors/tutor-already-exists-error'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'

export async function tutorRegister(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const tutorRegisterBody = z.object({
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

  const tutorInfomations = tutorRegisterBody.parse(request.body)

  try {
    const prismaTutorsRepository = new PrismaTutorsRepository()
    const prismaAddressesRepository = new PrismaAddressesRepository()
    const prismaPhonesRepository = new PrismaPhonesRepository()
    const tutorRegisterUseCase = new TutorRegisterUseCase(
      prismaPhonesRepository,
      prismaAddressesRepository,
      prismaTutorsRepository
    )

    await tutorRegisterUseCase.execute(tutorInfomations)
  } catch (err) {
    if (err instanceof TutorAlrealdyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof WrongCredentialsError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
