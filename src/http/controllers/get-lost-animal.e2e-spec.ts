import { createApp } from '../create-test-app'
import { makeLostAnimal } from '@/use-cases/factories/test/make-lost-animal'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'
import { PrismaClient } from '@prisma/client'

describe('Get lost animal (e2e)', () => {
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

  test('[GET] /lost-animals ', async () => {
    const tutor = makeCompleteTutor()

    await app.inject({
      method: 'POST',
      url: '/tutor',
      payload: tutor,
    })

    const { body, statusCode } = await app.inject({
      method: 'POST',
      url: '/tutor/sessions',
      payload: {
        email: tutor.email,
        password: tutor.password,
      },
    })

    const { token } = JSON.parse(body)

    const lostAnimal = makeLostAnimal()

    await app.inject({
      method: 'POST',
      url: '/lost-animals',
      payload: lostAnimal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const createdLostAnimal = await prisma.lostAnimal.findFirst({
      where: {
        name: lostAnimal.name,
      },
    })

    const id = createdLostAnimal?.id

    const url = `/lost-animals/${id}`

    const response = await app.inject({
      method: 'GET',
      url,
    })

    expect(response.statusCode).toEqual(200)
  })
})
