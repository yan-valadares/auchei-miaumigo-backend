import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EmailAlrealdyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'
import { makeNgoRegisterUseCase } from '@/use-cases/factories/make-ngo-register-use-case'

export interface NgoRegisterResponse {
  logoUrl: string | null
  ngoName: string
  adminFirstName: string
  adminLastName: string
  email: string
  password: string
  id: string
  created_at: Date
}
export async function ngoRegister(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<NgoRegisterResponse> {
  const ngoRegisterBodySchema = z.object({
    logoUrl: z.string(),
    ngoName: z.string().min(2),
    adminFirstName: z.string().min(2),
    adminLastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    phone: z.string().min(10),
    cep: z.string().min(8).max(8),
    city: z.string(),
    state: z.string().min(2).max(2),
    houseNumber: z.string().max(4),
    streetName: z.string(),
  })

  const ngoInfomations = ngoRegisterBodySchema.parse(request.body)

  try {
    const ngoRegisterUseCase = makeNgoRegisterUseCase()

    const { ngo } = await ngoRegisterUseCase.execute(ngoInfomations)

    return reply.status(201).send({
      ...ngo,
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
