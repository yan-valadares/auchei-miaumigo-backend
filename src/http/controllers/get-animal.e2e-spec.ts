import { createApp } from '../create-test-app'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'
import { makeCompleteAnimal } from '@/use-cases/factories/test/make-animal'
import { PrismaClient } from '@prisma/client'

describe('Get animal (e2e)', () => {
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

  test('[GET] /animals/id', async () => {
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

    const animal = makeCompleteAnimal()

    await app.inject({
      method: 'POST',
      url: '/animals',
      payload: animal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const createdAnimal = await prisma.animal.findFirst({
      where: { name: animal.name },
    })

    const id = createdAnimal?.id

    const url = `/animals/${id}`

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
