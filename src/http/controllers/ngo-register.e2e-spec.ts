import { PrismaClient } from '@prisma/client'
import { createApp } from '../create-test-app'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'

describe('Ngo register (e2e)', () => {
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

  test('[POST] /ngo ', async () => {
    const ngo = makeCompleteNgo()

    const response = await app.inject({
      method: 'POST',
      url: '/ngo',
      payload: ngo,
    })

    expect(response.statusCode).toBe(201)

    const ngoOnDatabase = await prisma.ngo.findUnique({
      where: { email: ngo.email },
    })

    expect(ngoOnDatabase).toBeTruthy()
  })
})
