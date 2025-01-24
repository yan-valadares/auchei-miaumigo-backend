import { createApp } from '../create-test-app'
import { makeCompleteAnimal } from '@/use-cases/factories/test/make-animal'
import { makeLostAnimal } from '@/use-cases/factories/test/make-lost-animal'
import { makeCompleteTutor } from '@/use-cases/factories/test/make-tutor'

describe('Create lost animal (e2e)', () => {
  let app: ReturnType<typeof createApp>

  beforeAll(async () => {
    app = createApp()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /lost-animal ', async () => {
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

    const lostAnimal = makeLostAnimal()

    const response = await app.inject({
      method: 'POST',
      url: '/lost-animals',
      payload: lostAnimal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toEqual(201)
  })
})
