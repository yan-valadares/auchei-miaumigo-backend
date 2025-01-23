import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'
import { makeNgoAuthenticateUseCase } from '@/use-cases/factories/make-ngo-authenticate-use-case'

export async function ngoAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const ngoAuthenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = ngoAuthenticateBodySchema.parse(request.body)

  try {
    const ngoAuthenticateUseCase = makeNgoAuthenticateUseCase()

    const { ngo } = await ngoAuthenticateUseCase.authenticate({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ngo.id,
        },
      }
    )

    return reply.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof WrongCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
