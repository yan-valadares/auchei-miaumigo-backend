import { InMemoryAnimalsRepository } from '@/repositories/in-memory/in-memory-animals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeAnimal } from './factories/test/make-animal'
import { FetchAnimalsUseCase } from './fetch-animals'

let animalsRepository: InMemoryAnimalsRepository
let sut: FetchAnimalsUseCase

describe('Fetch animals use case', () => {
  beforeEach(() => {
    animalsRepository = new InMemoryAnimalsRepository()
    sut = new FetchAnimalsUseCase(animalsRepository)
  })

  it('should be able to fetch an animal', async () => {
    await animalsRepository.create(await makeAnimal())

    const result = await sut.execute({ page: 1 })

    expect(result.animals).toHaveLength(1)
  })

  it('should not be able to fetch an animal in a page that do not exists', async () => {
    const result = await sut.execute({ page: 1 })

    expect(result.animals).toHaveLength(0)
  })

  it('should paginate the animals', async () => {
    for (let i = 0; i < 15; i++) {
      await animalsRepository.create(await makeAnimal())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.animals).toHaveLength(3)
  })

  it('should be able to fetch an animal by sex', async () => {
    for (let i = 0; i < 5; i++) {
      await animalsRepository.create(makeAnimal({ sex: 'male' }))
    }

    for (let i = 0; i < 4; i++) {
      await animalsRepository.create(
        makeAnimal({
          sex: 'female',
        })
      )
    }

    const result = await sut.execute({ page: 1, animalSex: 'female' })

    expect(result.animals).toHaveLength(4)
  })

  it('should be able to fetch an animal by sex and paginate it', async () => {
    for (let i = 0; i < 15; i++) {
      await animalsRepository.create(makeAnimal({ sex: 'male' }))
    }

    for (let i = 0; i < 15; i++) {
      await animalsRepository.create(
        makeAnimal({
          sex: 'female',
        })
      )
    }

    const result = await sut.execute({ page: 2, animalSex: 'female' })

    expect(result.animals).toHaveLength(3)
  })

  it('should be able to fetch an animal by species', async () => {
    for (let i = 0; i < 6; i++) {
      await animalsRepository.create(makeAnimal({ sex: 'cat' }))
    }

    for (let i = 0; i < 5; i++) {
      await animalsRepository.create(
        makeAnimal({
          sex: 'dog',
        })
      )
    }

    const result = await sut.execute({ page: 1, animalSex: 'dog' })

    expect(result.animals).toHaveLength(5)
  })

  it('should be able to fetch an animal by species and paginate it', async () => {
    for (let i = 0; i < 16; i++) {
      await animalsRepository.create(makeAnimal({ sex: 'cat' }))
    }

    for (let i = 0; i < 16; i++) {
      await animalsRepository.create(
        makeAnimal({
          sex: 'dog',
        })
      )
    }

    const result = await sut.execute({ page: 2, animalSex: 'dog' })

    expect(result.animals).toHaveLength(4)
  })

  it('should be able to fetch an animal by age', async () => {
    for (let i = 0; i < 3; i++) {
      await animalsRepository.create(makeAnimal({ ageGroup: 'young' }))
    }

    for (let i = 0; i < 3; i++) {
      await animalsRepository.create(
        makeAnimal({
          ageGroup: 'baby',
        })
      )
    }

    const result = await sut.execute({ page: 1, animalAge: 'baby' })

    expect(result.animals).toHaveLength(3)
  })

  it('should be able to fetch an animal by age and paginate it', async () => {
    for (let i = 0; i < 13; i++) {
      await animalsRepository.create(makeAnimal({ ageGroup: 'young' }))
    }

    for (let i = 0; i < 13; i++) {
      await animalsRepository.create(
        makeAnimal({
          ageGroup: 'baby',
        })
      )
    }

    const result = await sut.execute({ page: 2, animalAge: 'baby' })

    expect(result.animals).toHaveLength(1)
  })

  it('should be able to fetch an animal by size', async () => {
    for (let i = 0; i < 12; i++) {
      await animalsRepository.create(makeAnimal({ size: 'small' }))
    }

    for (let i = 0; i < 12; i++) {
      await animalsRepository.create(
        makeAnimal({
          size: 'large',
        })
      )
    }

    const result = await sut.execute({ page: 1, animalSize: 'large' })

    expect(result.animals).toHaveLength(12)
  })

  it('should be able to fetch an animal by size and paginate it', async () => {
    for (let i = 0; i < 25; i++) {
      await animalsRepository.create(makeAnimal({ ageGroup: 'young' }))
    }

    for (let i = 0; i < 25; i++) {
      await animalsRepository.create(
        makeAnimal({
          ageGroup: 'baby',
        })
      )
    }

    const result = await sut.execute({ page: 3, animalAge: 'baby' })

    expect(result.animals).toHaveLength(1)
  })

  it('should be able to fetch an animal by two params', async () => {
    for (let i = 0; i < 4; i++) {
      await animalsRepository.create(makeAnimal({ size: 'small' }))
    }

    await animalsRepository.create(
      makeAnimal({
        size: 'large',
        ageGroup: 'baby',
      })
    )

    const result = await sut.execute({
      page: 1,
      animalSize: 'large',
      animalAge: 'baby',
    })

    expect(result.animals).toHaveLength(1)
  })

  it('should be able to fetch an animal by three params', async () => {
    for (let i = 0; i < 4; i++) {
      await animalsRepository.create(makeAnimal({ size: 'small' }))
    }

    await animalsRepository.create(
      makeAnimal({
        size: 'large',
        ageGroup: 'baby',
        sex: 'female',
      })
    )

    const result = await sut.execute({
      page: 1,
      animalSize: 'large',
      animalAge: 'baby',
      animalSex: 'female',
    })

    expect(result.animals).toHaveLength(1)
  })

  it('should be able to fetch an animal by all params', async () => {
    for (let i = 0; i < 4; i++) {
      await animalsRepository.create(makeAnimal({ size: 'small' }))
    }

    await animalsRepository.create(
      makeAnimal({
        size: 'large',
        ageGroup: 'baby',
        sex: 'female',
        species: 'dog',
      })
    )

    const result = await sut.execute({
      page: 1,
      animalSize: 'large',
      animalAge: 'baby',
      animalSex: 'female',
      animalSpecies: 'dog',
    })

    expect(result.animals).toHaveLength(1)
  })
})
