import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { WrongCredentialsError } from '@/use-cases/errors/wrong-credentials-error'
import { makeTutorAuthenticateUseCase } from '@/use-cases/factories/make-tutor-authenticate-use-case'

export async function tutorAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const tutorAuthenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = tutorAuthenticateBodySchema.parse(request.body)

  try {
    const tutorAuthenticateUseCase = makeTutorAuthenticateUseCase()

    const { tutor } = await tutorAuthenticateUseCase.authenticate({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: tutor.id,
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
