import { InMemoryNgosRepository } from '@/repositories/in-memory/in-memory-ngos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetNgoProfileUseCase } from './get-ngo-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeNgo } from './factories/test/make-ngo'

let ngosRepository: InMemoryNgosRepository
let sut: GetNgoProfileUseCase

describe('Get ngo profile use case', () => {
  beforeEach(() => {
    ngosRepository = new InMemoryNgosRepository()
    sut = new GetNgoProfileUseCase(ngosRepository)
  })

  it('should be able to get user profile', async () => {
    const createdNgo = await ngosRepository.create(await makeNgo())

    const { ngo } = await sut.execute({
      ngoId: createdNgo.id,
    })

    expect(ngo.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        ngoId: 'wrong-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
