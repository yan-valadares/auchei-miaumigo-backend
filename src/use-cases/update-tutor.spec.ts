import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { InMemoryPhonesRepository } from '@/repositories/in-memory/in-memory-phones-repository'
import { InMemoryTutorsRepository } from '@/repositories/in-memory/in-memory-tutors-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeTutor } from './factories/test/make-tutor'
import { UpdateTutorUseCase } from './update-tutor'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let addressesRepository: InMemoryAddressesRepository
let phonesRepository: InMemoryPhonesRepository
let tutorsRepository: InMemoryTutorsRepository
let sut: UpdateTutorUseCase

describe('Tutor register use case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    phonesRepository = new InMemoryPhonesRepository()
    tutorsRepository = new InMemoryTutorsRepository()
    sut = new UpdateTutorUseCase(
      addressesRepository,
      phonesRepository,
      tutorsRepository
    )
  })

  it('should be able to update tutor name', async () => {
    const tutor = await tutorsRepository.create(
      await makeTutor({
        firstName: 'Fulano',
      })
    )

    await sut.execute({
      id: tutor.id,
      firstName: 'John',
    })

    const updatedTutor = await tutorsRepository.findById(tutor.id)

    expect(updatedTutor?.firstName).toBe('John')
  })

  it('should be able to update all tutor informations', async () => {
    const tutor = await tutorsRepository.create(
      await makeTutor({
        firstName: 'Fulano',
        lastName: 'De Tal',
        cpf: '12345678901',
        email: 'fulanodetal@email.com',
        avatarUrl: 'http://google.com',
      })
    )

    await sut.execute({
      id: tutor.id,
      firstName: 'Jhon',
      lastName: 'Doe',
      cpf: '11122233300',
      email: 'johndoe@email.com',
      avatar: 'http://bing.com',
    })

    const updatedTutor = await tutorsRepository.findById(tutor.id)

    expect(updatedTutor?.firstName).toBe('Jhon')
    expect(updatedTutor?.lastName).toBe('Doe')
    expect(updatedTutor?.cpf).toBe('11122233300')
    expect(updatedTutor?.email).toBe('johndoe@email.com')
    expect(updatedTutor?.avatarUrl).toBe('http://bing.com')
  })

  it('shouldn not be able to update a tutor with a wrong id', async () => {
    await expect(() =>
      sut.execute({ id: 'user do not exists' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
