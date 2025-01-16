import { InMemoryTutorsRepository } from '@/repositories/in-memory/in-memory-tutors-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetTutorProfileUseCase } from './get-tutor-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let tutorsRepository: InMemoryTutorsRepository
let sut: GetTutorProfileUseCase

describe('Get tutor profile use case', () => {
  beforeEach(() => {
    tutorsRepository = new InMemoryTutorsRepository()
    sut = new GetTutorProfileUseCase(tutorsRepository)
  })

  it('should be able to get user profile', async () => {
    const createdTutor = await tutorsRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      cpf: '12345678901',
      avatarUrl: 'www.google.com',
      password: await hash('Senh@segura123', 6),
    })

    const { tutor } = await sut.execute({
      tutorId: createdTutor.id,
    })

    expect(tutor.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        tutorId: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
