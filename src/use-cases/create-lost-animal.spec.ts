import { beforeEach, describe, expect, it } from 'vitest'
import { makeCompleteLostAnimal } from './factories/test/make-lost-animal'
import { InMemoryLostLostAnimalsRepository } from '@/repositories/in-memory/in-memory-lost-animals-repository'
import { CreateLostAnimalUseCase } from './create-lost-animal'

let lostAnimalsRepository: InMemoryLostLostAnimalsRepository
let sut: CreateLostAnimalUseCase

describe('Create lost animal use case', () => {
  beforeEach(() => {
    lostAnimalsRepository = new InMemoryLostLostAnimalsRepository()
    sut = new CreateLostAnimalUseCase(lostAnimalsRepository)
  })

  it('should be able to create an animal', async () => {
    const { lostAnimal } = await sut.execute(makeCompleteLostAnimal())

    expect(lostAnimal.id).toEqual(expect.any(String))
  })
})
