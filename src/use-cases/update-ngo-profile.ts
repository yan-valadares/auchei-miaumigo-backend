import type { NgosRepository } from '@/repositories/ngos-repository'
import type { Ngo } from '@prisma/client'
import type { AddressesRepository } from '@/repositories/addresses-repository'
import type { PhonesRepository } from '@/repositories/phones-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface UpdateNgoUseCaseParams {
  id: string
  ngoName?: string
  adminFirstName?: string
  adminLastName?: string
  email?: string
  phone?: string
  cep?: string
  state?: string
  city?: string
  streetName?: string
  houseNumber?: string
  logoUrl?: string
}

interface UpdateNgoUseCaseResponse {
  updatedNgo: Ngo
}

export class UpdateNgoUseCase {
  constructor(
    private addressesRepository: AddressesRepository,
    private phonesRepository: PhonesRepository,
    private ngosRepository: NgosRepository
  ) {}

  async execute({
    id,
    ngoName,
    adminFirstName,
    adminLastName,
    email,
    phone,
    cep,
    state,
    city,
    streetName,
    houseNumber,
    logoUrl,
  }: UpdateNgoUseCaseParams): Promise<UpdateNgoUseCaseResponse> {
    const ngoToBeUpdated = await this.ngosRepository.findById(id)

    if (!ngoToBeUpdated) throw new ResourceNotFoundError()

    const phoneToBeUpdated = await this.phonesRepository.findByNgoId(id)

    await this.phonesRepository.update({
      id: phoneToBeUpdated?.id,
      number: phone,
    })

    const addressToBeUpdated = await this.addressesRepository.findByNgoId(id)

    await this.addressesRepository.update({
      id: addressToBeUpdated?.id,
      cep,
      city,
      streetName,
      houseNumber,
      state,
    })

    const updatedNgo = await this.ngosRepository.update({
      id,
      adminFirstName,
      adminLastName,
      logoUrl,
      ngoName,
      email,
    })

    return { updatedNgo: updatedNgo }
  }
}
