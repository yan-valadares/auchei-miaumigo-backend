import { createApp } from '../create-test-app'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'
import { PrismaClient } from '@prisma/client'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'
import type { FetchNgosResponse } from './fetch-ngos'

describe('Fetch ngos (e2e)', () => {
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

  test('[GET] /ngos', async () => {
    const promises = Array.from({ length: 8 }, () => {
      const ngo = makeCompleteNgo()

      return app.inject({
        method: 'POST',
        url: '/ngo',
        payload: ngo,
      })
    })

    await Promise.all(promises)

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

    const response = await app.inject({
      method: 'GET',
      url: '/ngos?page=1',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toEqual(200)
  })
})
