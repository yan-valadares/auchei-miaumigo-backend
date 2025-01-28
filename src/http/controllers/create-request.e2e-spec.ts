import { PrismaClient } from '@prisma/client'
import { createApp } from '../create-test-app'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'
import { makeCompleteNgo } from '@/use-cases/factories/test/make-ngo'
import { makeCompleteAnimal } from '@/use-cases/factories/test/make-animal'

describe('Create request (e2e)', () => {
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

  test('[POST] /requests ', async () => {
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

    const response = await app.inject({
      method: 'POST',
      url: '/requests',
      payload: {
        animalId: createdAnimal?.id,
      },
      headers: {
        Authorization: `Bearer ${tutorToken}`,
      },
    })

    expect(response.statusCode).toEqual(201)
  })
})
