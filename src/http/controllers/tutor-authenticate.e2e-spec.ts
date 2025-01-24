import { PrismaClient } from '@prisma/client'
import { createApp } from '../create-test-app'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'

describe('Tutor authenticate (e2e)', () => {
  let app: ReturnType<typeof createApp>

  beforeAll(async () => {
    app = createApp()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /tutor ', async () => {
    const tutor = makeCompleteTutor()

    await app.inject({
      method: 'POST',
      url: '/tutor',
      payload: tutor,
    })

    const response = await app.inject({
      method: 'POST',
      url: '/tutor/sessions',
      payload: {
        email: tutor.email,
        password: tutor.password,
      },
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual({
      token: expect.any(String),
    })
  })
})
