import { PrismaClient } from '@prisma/client'
import { createApp } from '../create-test-app'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'

describe('Tutor register (e2e)', () => {
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

  test('[POST] /tutor ', async () => {
    const tutor = makeCompleteTutor()

    const response = await app.inject({
      method: 'POST',
      url: '/tutor',
      payload: tutor,
    })

    expect(response.statusCode).toBe(201)

    const tutorOnDatabase = await prisma.tutor.findUnique({
      where: { email: tutor.email },
    })

    expect(tutorOnDatabase).toBeTruthy()
  })
})
