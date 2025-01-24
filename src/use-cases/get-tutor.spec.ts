import { InMemoryTutorsRepository } from '@/repositories/in-memory/in-memory-tutors-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetTutorUseCase } from './get-tutor'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeTutor } from './factories/test/make-tutor'

let tutorsRepository: InMemoryTutorsRepository
let sut: GetTutorUseCase

describe('Get tutor use case', () => {
  beforeEach(() => {
    tutorsRepository = new InMemoryTutorsRepository()
    sut = new GetTutorUseCase(tutorsRepository)
  })

  it('should be able to get tutor', async () => {
    const createdTutor = await tutorsRepository.create(await makeTutor())

    const { tutor } = await sut.execute({
      tutorId: createdTutor.id,
    })

    expect(tutor.id).toEqual(expect.any(String))
  })

  it('should not be able to get tutor with wrong id', async () => {
    await expect(() =>
      sut.execute({
        tutorId: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
