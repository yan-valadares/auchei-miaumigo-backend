import { PrismaClient } from '@prisma/client'
import { createApp } from '../create-test-app'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'

describe('Get tutor (e2e)', () => {
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

  test('[GET] /tutor/id ', async () => {
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

    const url = `/tutor/${id}`

    const response = await app.inject({
      method: 'GET',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toEqual(200)
  })
})
