import type { TutorsRepository } from '@/repositories/tutors-repository'
import type { Tutor } from '@prisma/client'
import type { AddressesRepository } from '@/repositories/addresses-repository'
import type { PhonesRepository } from '@/repositories/phones-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface UpdateTutorUseCaseParams {
  id: string
  avatar?: string
  firstName?: string
  lastName?: string
  cpf?: string
  phone?: string
  email?: string
  cep?: string
  streetName?: string
  houseNumber?: string
  state?: string
  city?: string
  houseType?: string
}

interface UpdateTutorUseCaseResponse {
  updatedTutor: Tutor
}

export class UpdateTutorUseCase {
  constructor(
    private addressesRepository: AddressesRepository,
    private phonesRepository: PhonesRepository,
    private tutorsRepository: TutorsRepository
  ) {}

  async execute({
    id,
    avatar,
    firstName,
    lastName,
    cpf,
    phone,
    email,
    cep,
    streetName,
    houseNumber,
    state,
    city,
    houseType,
  }: UpdateTutorUseCaseParams): Promise<UpdateTutorUseCaseResponse> {
    const tutorToBeUpdated = await this.tutorsRepository.findById(id)

    if (!tutorToBeUpdated) throw new ResourceNotFoundError()

    const phoneToBeUpdated = await this.phonesRepository.findByTutorId(id)

    await this.phonesRepository.update({
      id: phoneToBeUpdated?.id,
      number: phone,
    })

    const addressToBeUpdated = await this.addressesRepository.findByTutorId(id)

    await this.addressesRepository.update({
      id: addressToBeUpdated?.id,
      cep,
      city,
      streetName,
      houseNumber,
      state,
      houseType,
    })

    const updatedTutor = await this.tutorsRepository.update({
      id,
      firstName,
      lastName,
      cpf,
      avatarUrl: avatar,
      email,
    })

    return { updatedTutor: updatedTutor }
  }
}
