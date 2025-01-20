import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLostAnimalsRepository } from '@/repositories/in-memory/in-memory-lost-animals-repository'
import { FetchLostAnimalsUseCase } from './fetch-lost-animals'
import { makeLostAnimal } from './factories/test/make-lost-animal'

let lostAnimalsRepository: InMemoryLostAnimalsRepository
let sut: FetchLostAnimalsUseCase

describe('Fetch animals use case', () => {
  beforeEach(() => {
    lostAnimalsRepository = new InMemoryLostAnimalsRepository()
    sut = new FetchLostAnimalsUseCase(lostAnimalsRepository)
  })

  it('should be able to fetch a lost animal', async () => {
    await lostAnimalsRepository.create(makeLostAnimal())

    const result = await sut.execute({ page: 1 })

    expect(result.lostAnimals).toHaveLength(1)
  })

  it('should not be able to fetch a lost animal in a page that do not exists', async () => {
    const result = await sut.execute({ page: 1 })

    expect(result.lostAnimals).toHaveLength(0)
  })

  it('should paginate the lost animals', async () => {
    for (let i = 0; i < 15; i++) {
      await lostAnimalsRepository.create(makeLostAnimal())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.lostAnimals).toHaveLength(3)
  })

  it('should be able to fetch an animal by state', async () => {
    for (let i = 0; i < 5; i++) {
      await lostAnimalsRepository.create(makeLostAnimal({ state: 'BA' }))
    }

    for (let i = 0; i < 4; i++) {
      await lostAnimalsRepository.create(
        makeLostAnimal({
          state: 'SP',
        })
      )
    }

    const result = await sut.execute({ page: 1, state: 'SP' })

    expect(result.lostAnimals).toHaveLength(4)
  })

  it('should be able to fetch an animal by sex and paginate it', async () => {
    for (let i = 0; i < 15; i++) {
      await lostAnimalsRepository.create(makeLostAnimal({ state: 'ES' }))
    }

    for (let i = 0; i < 15; i++) {
      await lostAnimalsRepository.create(
        makeLostAnimal({
          state: 'RJ',
        })
      )
    }

    const result = await sut.execute({ page: 2, state: 'RJ' })

    expect(result.lostAnimals).toHaveLength(3)
  })

  it('should be able to fetch an animal by state', async () => {
    for (let i = 0; i < 5; i++) {
      await lostAnimalsRepository.create(makeLostAnimal({ state: 'BA' }))
    }

    for (let i = 0; i < 4; i++) {
      await lostAnimalsRepository.create(
        makeLostAnimal({
          state: 'SP',
        })
      )
    }

    const result = await sut.execute({ page: 1, state: 'SP' })

    expect(result.lostAnimals).toHaveLength(4)
  })

  it('should be able to fetch an animal by state and paginate it', async () => {
    for (let i = 0; i < 15; i++) {
      await lostAnimalsRepository.create(makeLostAnimal({ state: 'ES' }))
    }

    for (let i = 0; i < 15; i++) {
      await lostAnimalsRepository.create(
        makeLostAnimal({
          state: 'RJ',
        })
      )
    }

    const result = await sut.execute({ page: 2, state: 'RJ' })

    expect(result.lostAnimals).toHaveLength(3)
  })

  it('should be able to fetch an animal by state and city', async () => {
    for (let i = 0; i < 5; i++) {
      await lostAnimalsRepository.create(makeLostAnimal({ state: 'SP' }))
    }

    await lostAnimalsRepository.create(
      makeLostAnimal({
        state: 'SP',
        city: 'São Paulo',
      })
    )

    const result = await sut.execute({
      page: 1,
      state: 'SP',
      city: 'São Paulo',
    })

    expect(result.lostAnimals).toHaveLength(1)
  })

  it('should be able to fetch an animal by state and city and paginate it', async () => {
    for (let i = 0; i < 15; i++) {
      await lostAnimalsRepository.create(makeLostAnimal({ state: 'SP' }))
    }

    for (let i = 0; i < 15; i++) {
      await lostAnimalsRepository.create(
        makeLostAnimal({
          state: 'SP',
          city: 'São Paulo',
        })
      )
    }

    const result = await sut.execute({
      page: 2,
      state: 'SP',
      city: 'São Paulo',
    })

    expect(result.lostAnimals).toHaveLength(3)
  })

  it('should not be able to fetch an animal by city if state is not chosen', async () => {
    for (let i = 0; i < 4; i++) {
      await lostAnimalsRepository.create(makeLostAnimal({ city: 'São Paulo' }))
    }

    const result = await sut.execute({
      page: 1,
      city: 'São Paulo',
    })

    expect(result.lostAnimals).toHaveLength(0)
  })
})
