import { InMemoryTutorsRepository } from '@/repositories/in-memory/in-memory-tutors-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { TutorAuthenticateUseCase } from './tutor-authenticate'
import { hash } from 'bcryptjs'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let tutorsRepository: InMemoryTutorsRepository
let sut: TutorAuthenticateUseCase

describe('Tutor authenticate use case', () => {
  beforeEach(() => {
    tutorsRepository = new InMemoryTutorsRepository()
    sut = new TutorAuthenticateUseCase(tutorsRepository)
  })

  it('should be able to authenticate tutor', async () => {
    await tutorsRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      cpf: '12345678901',
      avatarUrl: 'www.google.com',
      password: await hash('Senh@segura123', 6),
    })

    const { tutor } = await sut.authenticate({
      email: 'johndoe@email.com',
      password: 'Senh@segura123',
    })

    expect(tutor.id).toEqual(expect.any(String))
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
    await tutorsRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      cpf: '12345678901',
      avatarUrl: 'www.google.com',
      password: await hash('Senh@segura123', 6),
    })

    await expect(() =>
      sut.authenticate({
        email: 'johndoe@email.com',
        password: 'Senh@falsa123',
      })
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })
})
