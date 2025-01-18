import { InMemoryNgosRepository } from '@/repositories/in-memory/in-memory-ngos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeNgo } from './factories/test/make-ngo'
import { FetchNgosUseCase } from './fetch-ngos'

let ngosRepository: InMemoryNgosRepository
let sut: FetchNgosUseCase

describe('Fetch use case', () => {
  beforeEach(() => {
    ngosRepository = new InMemoryNgosRepository()
    sut = new FetchNgosUseCase(ngosRepository)
  })

  it('should be able to fetch a ngo', async () => {
    await ngosRepository.create(await makeNgo())

    const result = await sut.execute({ page: 1 })

    expect(result.ngos).toHaveLength(1)
  })

  it('should not be able to fetch a ngo in a page that do not exists', async () => {
    const result = await sut.execute({ page: 1 })

    expect(result.ngos).toHaveLength(0)
  })

  it('should paginate the ngos', async () => {
    for (let i = 0; i < 15; i++) {
      await ngosRepository.create(await makeNgo())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.ngos).toHaveLength(3)
  })
})
