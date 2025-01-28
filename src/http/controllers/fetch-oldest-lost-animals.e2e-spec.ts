import { createApp } from '../create-test-app'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'
import { PrismaClient } from '@prisma/client'
import { makeLostAnimal } from '@/use-cases/factories/test/make-lost-animal'
import type { FetchOldestLostAnimalsResponse } from './fetch-oldest-lost-animals'

describe('Fetch oldest lost animals (e2e)', () => {
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

  test('[GET] /lost-animals/oldest', async () => {
    const tutor = makeCompleteTutor()

    await app.inject({
      method: 'POST',
      url: '/tutor',
      payload: tutor,
    })

    const { body } = await app.inject({
      method: 'POST',
      url: '/tutor/sessions',
      payload: {
        email: tutor.email,
        password: tutor.password,
      },
    })

    const { token } = JSON.parse(body)

    const promises = Array.from({ length: 12 }, () => {
      const lostAnimal = makeLostAnimal()

      return app.inject({
        method: 'POST',
        url: '/lost-animals',
        payload: lostAnimal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    })

    await Promise.all(promises)

    const response = await app.inject({
      method: 'GET',
      url: '/lost-animals/oldest',
    })

    const responseBody = JSON.parse(
      response.body
    ) as FetchOldestLostAnimalsResponse

    expect(response.statusCode).toEqual(200)
    expect(responseBody.lostAnimals).toHaveLength(12)
  })
})
