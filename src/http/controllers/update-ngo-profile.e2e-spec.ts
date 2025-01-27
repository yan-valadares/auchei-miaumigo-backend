import { PrismaClient } from '@prisma/client'
import { createApp } from '../create-test-app'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'
import { randomUUID } from 'node:crypto'

describe('Ngo update (e2e)', () => {
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

  test('[PUT] /ngo ', async () => {
    const ngo = makeCompleteNgo({
      id: randomUUID(),
    })

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
      method: 'PUT',
      url: '/ngo',
      payload: {
        id: ngo.id,
        ngoName: 'Cuidadogs',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const ngoOnDatabase = await prisma.ngo.findUnique({
      where: {
        email: ngo.email,
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(ngoOnDatabase?.ngoName).toEqual('Cuidadogs')
  })
})
