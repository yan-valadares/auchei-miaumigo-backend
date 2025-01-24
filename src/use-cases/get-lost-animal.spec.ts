import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryLostAnimalsRepository } from '@/repositories/in-memory/in-memory-lost-animals-repository'
import { GetLostAnimalUseCase } from './get-lost-animal'
import { makeLostAnimal } from './factories/test/make-lost-animal'

let lostanimalsRepository: InMemoryLostAnimalsRepository
let sut: GetLostAnimalUseCase

describe('Get lostanimal use case', () => {
  beforeEach(() => {
    lostanimalsRepository = new InMemoryLostAnimalsRepository()
    sut = new GetLostAnimalUseCase(lostanimalsRepository)
  })

  it('should be able to get a lost animal', async () => {
    const createdLostAnimal = await lostanimalsRepository.create(
      makeLostAnimal()
    )

    const { lostAnimal } = await sut.execute({
      lostAnimalId: createdLostAnimal.id,
    })

    expect(lostAnimal.id).toEqual(expect.any(String))
  })

  it('should not be able to get lost animal with wrong id', async () => {
    await expect(() =>
      sut.execute({
        lostAnimalId: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
