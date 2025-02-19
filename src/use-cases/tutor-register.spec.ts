import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { InMemoryPhonesRepository } from '@/repositories/in-memory/in-memory-phones-repository'
import { InMemoryTutorsRepository } from '@/repositories/in-memory/in-memory-tutors-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { TutorRegisterUseCase } from './tutor-register'
import { compare } from 'bcryptjs'
import { EmailAlrealdyExistsError } from './errors/email-already-exists-error'
import { makeCompleteTutor } from './factories/test/make-tutor'

let addressesRepository: InMemoryAddressesRepository
let phonesRepository: InMemoryPhonesRepository
let tutorsRepository: InMemoryTutorsRepository
let sut: TutorRegisterUseCase

describe('Tutor register use case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    phonesRepository = new InMemoryPhonesRepository()
    tutorsRepository = new InMemoryTutorsRepository()
    sut = new TutorRegisterUseCase(
      addressesRepository,
      phonesRepository,
      tutorsRepository
    )
  })

  it('should be able to register', async () => {
    const { tutor } = await sut.execute(makeCompleteTutor())

    expect(tutor.id).toEqual(expect.any(String))
  })

  it('should hash tutor password upon register', async () => {
    const { tutor } = await sut.execute(
      makeCompleteTutor({
        password: 'Senh@segura123',
        confirmPassword: 'Senh@segura123',
      })
    )

    const isPasswordCorrectlyHashed = await compare(
      'Senh@segura123',
      tutor.password
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const email = 'johndoe@email.com'

    await sut.execute(makeCompleteTutor({ email }))

    await expect(() =>
      sut.execute(makeCompleteTutor({ email }))
    ).rejects.toBeInstanceOf(EmailAlrealdyExistsError)
  })
})
