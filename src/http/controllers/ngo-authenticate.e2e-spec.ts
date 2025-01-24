import { PrismaClient } from '@prisma/client'
import { createApp } from '../create-test-app'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'

describe('Ngo authenticate (e2e)', () => {
  let app: ReturnType<typeof createApp>

  beforeAll(async () => {
    app = createApp()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /ngo ', async () => {
    const ngo = makeCompleteNgo()

    await app.inject({
      method: 'POST',
      url: '/ngo',
      payload: ngo,
    })

    const response = await app.inject({
      method: 'POST',
      url: '/ngo/sessions',
      payload: {
        email: ngo.email,
        password: ngo.password,
      },
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual({
      token: expect.any(String),
    })
  })
})
