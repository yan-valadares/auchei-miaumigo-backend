import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { InMemoryPhonesRepository } from '@/repositories/in-memory/in-memory-phones-repository'
import { InMemoryNgosRepository } from '@/repositories/in-memory/in-memory-ngos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { NgoRegisterUseCase } from './ngo-register'
import { compare } from 'bcryptjs'
import { EmailAlrealdyExistsError } from './errors/email-already-exists-error'
import { makeCompleteNgo, makeNgo } from './factories/test/make-ngo'

let addressesRepository: InMemoryAddressesRepository
let phonesRepository: InMemoryPhonesRepository
let NgosRepository: InMemoryNgosRepository
let sut: NgoRegisterUseCase

describe('Ngo register use case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    phonesRepository = new InMemoryPhonesRepository()
    NgosRepository = new InMemoryNgosRepository()
    sut = new NgoRegisterUseCase(
      addressesRepository,
      phonesRepository,
      NgosRepository
    )
  })

  it('should be able to register', async () => {
    const { ngo } = await sut.execute(makeCompleteNgo())

    expect(ngo.id).toEqual(expect.any(String))
  })

  it('should hash ngo password upon register', async () => {
    const { ngo } = await sut.execute(
      makeCompleteNgo({
        password: 'Senh@segura123',
        confirmPassword: 'Senh@segura123',
      })
    )

    const isPasswordCorrectlyHashed = await compare(
      'Senh@segura123',
      ngo.password
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const email = 'johndoe@email.com'

    await sut.execute(makeCompleteNgo({ email }))

    await expect(() =>
      sut.execute(makeCompleteNgo({ email }))
    ).rejects.toBeInstanceOf(EmailAlrealdyExistsError)
  })
})
