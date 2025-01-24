import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { InMemoryPhonesRepository } from '@/repositories/in-memory/in-memory-phones-repository'
import { InMemoryNgosRepository } from '@/repositories/in-memory/in-memory-ngos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeNgo } from './factories/test/make-ngo'
import { UpdateNgoUseCase } from './update-ngo'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let addressesRepository: InMemoryAddressesRepository
let phonesRepository: InMemoryPhonesRepository
let ngosRepository: InMemoryNgosRepository
let sut: UpdateNgoUseCase

describe('Ngo register use case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    phonesRepository = new InMemoryPhonesRepository()
    ngosRepository = new InMemoryNgosRepository()
    sut = new UpdateNgoUseCase(
      addressesRepository,
      phonesRepository,
      ngosRepository
    )
  })

  it('should be able to update ngo name', async () => {
    const ngo = await ngosRepository.create(
      await makeNgo({
        ngoName: 'Animalar',
      })
    )

    await sut.execute({
      id: ngo.id,
      ngoName: 'Cuidadogs',
    })

    const updatedNgo = await ngosRepository.findById(ngo.id)

    expect(updatedNgo?.ngoName).toBe('Cuidadogs')
  })

  it('should be able to update all ngo informations', async () => {
    const ngo = await ngosRepository.create(
      await makeNgo({
        adminFirstName: 'Fulano',
        adminLastName: 'De Tal',
        ngoName: 'Animalar',
        email: 'fulanodetal@email.com',
        logoUrl: 'http://google.com',
      })
    )

    await sut.execute({
      id: ngo.id,
      adminFirstName: 'Jhon',
      adminLastName: 'Doe',
      email: 'johndoe@email.com',
      logoUrl: 'http://bing.com',
    })

    const updatedNgo = await ngosRepository.findById(ngo.id)

    expect(updatedNgo?.adminFirstName).toBe('Jhon')
    expect(updatedNgo?.adminLastName).toBe('Doe')
    expect(updatedNgo?.email).toBe('johndoe@email.com')
    expect(updatedNgo?.logoUrl).toBe('http://bing.com')
  })

  it('shouldn not be able to update a ngo with a wrong id', async () => {
    await expect(() =>
      sut.execute({ id: 'user do not exists' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
