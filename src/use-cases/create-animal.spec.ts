import { InMemoryAnimalsRepository } from '@/repositories/in-memory/in-memory-animals-repository'
import { CreateAnimalUseCase } from './create-animal'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeCompleteAnimal } from './factories/test/make-animal'

let animalsRepository: InMemoryAnimalsRepository
let sut: CreateAnimalUseCase

describe('Create animal use case', () => {
  beforeEach(() => {
    animalsRepository = new InMemoryAnimalsRepository()
    sut = new CreateAnimalUseCase(animalsRepository)
  })

  it('should be able to create an animal', async () => {
    const { animal } = await sut.execute(makeCompleteAnimal())

    expect(animal.id).toEqual(expect.any(String))
  })
})
