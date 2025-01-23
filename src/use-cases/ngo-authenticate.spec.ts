import { InMemoryNgosRepository } from '@/repositories/in-memory/in-memory-ngos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { NgoAuthenticateUseCase } from './ngo-authenticate'
import { hash } from 'bcryptjs'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { makeNgo } from './factories/test/make-ngo'

let ngosRepository: InMemoryNgosRepository
let sut: NgoAuthenticateUseCase

describe('Ngo authenticate use case', () => {
  beforeEach(() => {
    ngosRepository = new InMemoryNgosRepository()
    sut = new NgoAuthenticateUseCase(ngosRepository)
  })

  it('should be able to authenticate ngo', async () => {
    const createdNgo = await ngosRepository.create(
      await makeNgo({
        email: 'johndoe@email.com',
        password: await hash('Senh@segura123', 6),
      })
    )

    const { ngo } = await sut.authenticate({
      email: 'johndoe@email.com',
      password: 'Senh@segura123',
    })

    expect(ngo.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.authenticate({
        email: 'johndoe@email.com',
        password: 'Senh@segura123',
      })
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const hashedPassword = await hash('Senh@segura123', 6)

    await ngosRepository.create(await makeNgo({ password: hashedPassword }))

    await expect(() =>
      sut.authenticate({
        email: 'johndoe@email.com',
        password: 'Senh@falsa123',
      })
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })
})
