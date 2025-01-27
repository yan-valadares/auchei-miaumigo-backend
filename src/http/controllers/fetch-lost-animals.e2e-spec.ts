import { createApp } from '../create-test-app'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'
import { PrismaClient } from '@prisma/client'
import { makeLostAnimal } from '@/use-cases/factories/test/make-lost-animal'
import type { FetchLostAnimalsResponse } from './fetch-lost-animals'

describe('Fetch lost animals (e2e)', () => {
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

  test('[GET] /lost-animals', async () => {
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
      url: '/lost-animals?state=&city=&page=1',
    })

    const responseBody = JSON.parse(response.body) as FetchLostAnimalsResponse

    expect(response.statusCode).toEqual(200)
    expect(responseBody.lostAnimals).toHaveLength(12)
  })

  test('[GET] /lost-animals --- state and city', async () => {
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

    let promises = Array.from({ length: 6 }, () => {
      const animal = makeLostAnimal({
        state: 'RJ',
        city: 'Niterói',
      })

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

    promises = Array.from({ length: 6 }, () => {
      const animal = makeLostAnimal({
        state: 'SP',
        city: 'Campinas',
      })

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

    const response = await app.inject({
      method: 'GET',
      url: '/lost-animals?state=SP&city=Campinas&page=1',
    })

    const responseBody = JSON.parse(response.body) as FetchLostAnimalsResponse

    expect(response.statusCode).toEqual(200)
    const animalsArray = Array.isArray(responseBody.lostAnimals)
      ? responseBody.lostAnimals
      : Object.values(responseBody.lostAnimals)

    for (const lostAnimals of animalsArray) {
      expect((lostAnimals as any).state).toEqual('SP')
      expect((lostAnimals as any).city).toEqual('Campinas')
    }
  })
})
