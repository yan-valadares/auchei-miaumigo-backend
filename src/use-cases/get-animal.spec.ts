import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryAnimalsRepository } from '@/repositories/in-memory/in-memory-animals-repository'
import { GetAnimalProfileUseCase } from './get-animal'
import { makeAnimal } from './factories/test/make-animal'

let animalsRepository: InMemoryAnimalsRepository
let sut: GetAnimalProfileUseCase

describe('Get animal use case', () => {
  beforeEach(() => {
    animalsRepository = new InMemoryAnimalsRepository()
    sut = new GetAnimalProfileUseCase(animalsRepository)
  })

  it('should be able to get an animal', async () => {
    const createdAnimal = await animalsRepository.create(makeAnimal())

    const { animal } = await sut.execute({
      animalId: createdAnimal.id,
    })

    expect(animal.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        animalId: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
