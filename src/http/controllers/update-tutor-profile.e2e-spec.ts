import { PrismaClient } from '@prisma/client'
import { createApp } from '../create-test-app'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'
import { randomUUID } from 'node:crypto'

describe('Tutor update (e2e)', () => {
  let app: ReturnType<typeof createApp>
  let prisma: PrismaClient

  beforeAll(async () => {
    app = createApp()
    prisma = new PrismaClient()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[PUT] /tutor ', async () => {
    const tutor = makeCompleteTutor()

    await app.inject({
      method: 'POST',
      url: '/tutor',
      payload: tutor,
    })

    const createdTutor = await prisma.tutor.findUnique({
      where: { email: tutor.email },
    })

    const id = createdTutor?.id

    const { body } = await app.inject({
      method: 'POST',
      url: '/tutor/sessions',
      payload: {
        email: tutor.email,
        password: tutor.password,
      },
    })

    const { token } = JSON.parse(body)

    const response = await app.inject({
      method: 'PUT',
      url: '/tutor',
      payload: {
        id: id,
        firstName: 'John',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const tutorOnDatabase = await prisma.tutor.findUnique({
      where: {
        email: tutor.email,
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(tutorOnDatabase?.firstName).toEqual('John')
  })
})
