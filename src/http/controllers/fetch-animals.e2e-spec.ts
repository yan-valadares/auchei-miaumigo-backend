import { createApp } from '../create-test-app'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'
import { makeCompleteAnimal } from '@/use-cases/factories/test/make-animal'
import { PrismaClient } from '@prisma/client'
import type { FetchAnimalsResponse } from './fetch-animals'

describe('Fetch animals (e2e)', () => {
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

  test('[GET] /animals', async () => {
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

    const promises = Array.from({ length: 12 }, () => {
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

    const response = await app.inject({
      method: 'GET',
      url: '/animals?state=&city=&animalSpecies=&animalAge=&animalSize=&animalSex=&animalNgo=&page=1',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const responseBody = JSON.parse(response.body) as FetchAnimalsResponse

    expect(response.statusCode).toEqual(200)
    expect(responseBody.animals).toHaveLength(12)
  })

  test('[GET] /animals --- Select Animal Size and Age', async () => {
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

    let promises = Array.from({ length: 6 }, () => {
      const animal = makeCompleteAnimal({
        size: 'small',
        age: 'adult',
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
      const animal = makeCompleteAnimal({
        size: 'large',
        age: 'young',
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
      url: '/animals?state=&city=&animalSpecies=&animalAge=young&animalSize=large&animalSex=&animalNgo=&page=1',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const responseBody = JSON.parse(response.body) as FetchAnimalsResponse

    expect(response.statusCode).toEqual(200)
    const animalsArray = Array.isArray(responseBody.animals)
      ? responseBody.animals
      : Object.values(responseBody.animals)

    for (const animal of animalsArray) {
      expect((animal as any).size).toEqual('large')
      expect((animal as any).ageGroup).toEqual('young')
    }
  })
})
