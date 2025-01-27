import { createApp } from '../create-test-app'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'
import { makeCompleteAnimal } from '@/use-cases/factories/test/make-animal'
import { PrismaClient } from '@prisma/client'
import type { FetchAnimalsResponse } from './fetch-animals'

describe('Fetch ngo animals (e2e)', () => {
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

    let promises = Array.from({ length: 12 }, () => {
      const animal = makeCompleteAnimal()

      return app.inject({
        method: 'POST',
        url: '/animals',
        payload: animal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    })

    await Promise.all(promises)

    const anotherNgo = makeCompleteNgo({
      email: 'cuidadogs@email.com',
    })

    await app.inject({
      method: 'POST',
      url: '/ngo',
      payload: anotherNgo,
    })

    const { body: anotherBody } = await app.inject({
      method: 'POST',
      url: '/ngo/sessions',
      payload: {
        email: anotherNgo.email,
        password: anotherNgo.password,
      },
    })

    const createdNgo = await prisma.ngo.findUnique({
      where: { email: anotherNgo.email },
    })

    const { token: anotherToken } = JSON.parse(anotherBody)

    promises = Array.from({ length: 4 }, () => {
      const animal = makeCompleteAnimal()

      return app.inject({
        method: 'POST',
        url: '/animals',
        payload: animal,
        headers: {
          Authorization: `Bearer ${anotherToken}`,
        },
      })
    })

    await Promise.all(promises)

    const response = await app.inject({
      method: 'GET',
      url: `/my-animals/${createdNgo?.id}?&page=1`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const responseBody = JSON.parse(response.body) as FetchAnimalsResponse

    expect(response.statusCode).toEqual(200)

    expect(responseBody.animals).toHaveLength(4)

    for (const animal of responseBody.animals) {
      expect(animal.ngo_id).toEqual(createdNgo?.id)
    }
  })
})
