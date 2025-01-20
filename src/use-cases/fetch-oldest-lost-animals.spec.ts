import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLostAnimalsRepository } from '@/repositories/in-memory/in-memory-lost-animals-repository'
import { makeLostAnimal } from './factories/test/make-lost-animal'
import { FetchOldestLostAnimalsUseCase } from './fetch-oldest-lost-animals'

let lostAnimalsRepository: InMemoryLostAnimalsRepository
let sut: FetchOldestLostAnimalsUseCase

describe('Fetch oldest lost animals use case', () => {
  beforeEach(() => {
    lostAnimalsRepository = new InMemoryLostAnimalsRepository()
    sut = new FetchOldestLostAnimalsUseCase(lostAnimalsRepository)
  })

  it('should be able to fetch lost animal', async () => {
    await lostAnimalsRepository.create(makeLostAnimal())

    const result = await sut.execute()

    expect(result.lostAnimals).toHaveLength(1)
  })

  it('should be able to fetch the oldest lost animal', async () => {
    for (let i = 0; i < 10; i++) {
      await lostAnimalsRepository.create(makeLostAnimal())
    }

    const result = await sut.execute()

    const isTheFirstTheOldest = result.lostAnimals.every((animal, index) => {
      if (index === 0) return true
      return (
        new Date(animal.lostDate).getTime() >=
        new Date(result.lostAnimals[0].lostDate).getTime()
      )
    })

    expect(result.lostAnimals).toHaveLength(10)
    expect(isTheFirstTheOldest).toBe(true)
  })

  it('should be able to fetch a max result of 12 items', async () => {
    for (let i = 0; i < 25; i++) {
      await lostAnimalsRepository.create(makeLostAnimal())
    }

    const result = await sut.execute()

    expect(result.lostAnimals).toHaveLength(12)
  })
})
