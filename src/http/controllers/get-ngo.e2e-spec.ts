import { PrismaClient } from '@prisma/client'
import { createApp } from '../create-test-app'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'

describe('Get ngo (e2e)', () => {
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

  test('[GET] /ngo/id ', async () => {
    const ngo = makeCompleteNgo()

    await app.inject({
      method: 'POST',
      url: '/ngo',
      payload: ngo,
    })

    const createdNgo = await prisma.ngo.findUnique({
      where: { email: ngo.email },
    })

    const id = createdNgo?.id

    const { body } = await app.inject({
      method: 'POST',
      url: '/ngo/sessions',
      payload: {
        email: ngo.email,
        password: ngo.password,
      },
    })

    const { token } = JSON.parse(body)

    const url = `/ngo/${id}`

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
