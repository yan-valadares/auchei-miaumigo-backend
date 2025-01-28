import { createApp } from '../create-test-app'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'
import { makeCompleteAnimal } from '@/use-cases/factories/test/make-animal'
import { PrismaClient } from '@prisma/client'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'
import type { FetchNgoRequestsResponse } from './fetch-ngo-requests'

describe('Fetch ngo request (e2e)', () => {
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

  test('[GET] /my-request/id', async () => {
    const ngo = makeCompleteNgo()

    await app.inject({
      method: 'POST',
      url: '/ngo',
      payload: ngo,
    })

    const createdNgo = await prisma.ngo.findUnique({
      where: { email: ngo.email },
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

    const tutor = makeCompleteTutor()

    await app.inject({
      method: 'POST',
      url: '/tutor',
      payload: tutor,
    })

    const { body: tutorBody } = await app.inject({
      method: 'POST',
      url: '/tutor/sessions',
      payload: {
        email: tutor.email,
        password: tutor.password,
      },
    })

    const { token: tutorToken } = JSON.parse(tutorBody)

    const animals = await prisma.animal.findMany()

    promises = Array.from({ length: 6 }, () => {
      return app.inject({
        method: 'POST',
        url: '/requests',
        payload: {
          animalId: animals[0].id,
        },
        headers: {
          Authorization: `Bearer ${tutorToken}`,
        },
      })
    })

    await Promise.all(promises)

    const response = await app.inject({
      method: 'GET',
      url: `/my-requests/${createdNgo?.id}?&page=1`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const responseBody = JSON.parse(response.body) as FetchNgoRequestsResponse

    expect(response.statusCode).toEqual(200)

    for (const requests of responseBody.requests) {
      expect(requests.ngo_id).toEqual(createdNgo?.id)
    }
  })
})
