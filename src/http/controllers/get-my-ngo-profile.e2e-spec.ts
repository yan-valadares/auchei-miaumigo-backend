import { PrismaClient } from '@prisma/client'
import { createApp } from '../create-test-app'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'

describe('Get my ngo profile (e2e)', () => {
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

  beforeEach(async () => {
    await prisma.ngo.deleteMany()
  })

  test('[POST] /ngo/my-profile ', async () => {
    const ngo = makeCompleteNgo()

    await app.inject({
      method: 'POST',
      url: '/ngo',
      payload: ngo,
    })

    const { body } = await app.inject({
      method: 'POST',
      url: '/ngo/sessions',
      payload: {
        email: ngo.email,
        password: ngo.password,
      },
    })

    const { token } = JSON.parse(body)

    const response = await app.inject({
      method: 'GET',
      url: '/ngo/my-profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toEqual(200)
  })
})
