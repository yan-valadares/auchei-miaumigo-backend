import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EmailAlrealdyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'
import { makeUpdateNgoUseCase } from '@/use-cases/factories/make-uptdate-ngo-use-case'

export async function updateNgo(request: FastifyRequest, reply: FastifyReply) {
  const updateNgoBodySchema = z.object({
    logoUrl: z.string().optional(),
    ngoName: z.string().min(2).optional(),
    adminFirstName: z.string().min(2).optional(),
    adminLastName: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).optional(),
    cep: z.string().min(8).max(8).optional(),
    city: z.string().optional(),
    state: z.string().min(2).max(2).optional(),
    houseNumber: z.string().max(4).optional(),
    streetName: z.string().optional(),
  })

  const ngoInfomations = updateNgoBodySchema.parse(request.body)

  try {
    const updateNgoUseCase = makeUpdateNgoUseCase()

    const { updatedNgo } = await updateNgoUseCase.execute({
      id: request.user.sub,
      ...ngoInfomations,
    })

    return reply.status(200).send({
      ...updatedNgo,
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
