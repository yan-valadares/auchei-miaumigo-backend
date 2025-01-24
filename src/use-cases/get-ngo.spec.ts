import { InMemoryNgosRepository } from '@/repositories/in-memory/in-memory-ngos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetNgoUseCase } from './get-ngo'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeNgo } from './factories/test/make-ngo'

let ngosRepository: InMemoryNgosRepository
let sut: GetNgoUseCase

describe('Get ngo use case', () => {
  beforeEach(() => {
    ngosRepository = new InMemoryNgosRepository()
    sut = new GetNgoUseCase(ngosRepository)
  })

  it('should be able to get user ', async () => {
    const createdNgo = await ngosRepository.create(await makeNgo())

    const { ngo } = await sut.execute({
      ngoId: createdNgo.id,
    })

    expect(ngo.id).toEqual(expect.any(String))
  })

  it('should not be able to get user  with wrong id', async () => {
    await expect(() =>
      sut.execute({
        ngoId: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
