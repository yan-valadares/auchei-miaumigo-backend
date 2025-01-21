import type { Prisma, Address } from '@prisma/client'
import type { AddressesRepository } from '../addresses-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressesRepository implements AddressesRepository {
  public items: Address[] = []

  async findByTutorId(tutorId: string): Promise<Address | null> {
    const address = this.items.find(item => item.tutor_id === tutorId)

    return address ?? null
  }
  async findByNgoId(ngoId: string): Promise<Address | null> {
    const address = this.items.find(item => item.ngo_id === ngoId)

    return address ?? null
  }

  async create(data: Prisma.AddressCreateInput) {
    const address = {
      id: randomUUID(),
      cep: data.cep,
      city: data.city,
      state: data.state,
      houseNumber: data.houseNumber ?? null,
      houseType: data.houseType,
      streetName: data.streetName ?? '',
      tutor_id: null,
      ngo_id: null,
    }

    this.items.push(address)

    return address
  }

  async update(data: Prisma.AddressUpdateInput): Promise<Address> {
    const addressIndex = this.items.findIndex(item => item.id === data.id)

    const updatedAddress = this.items[addressIndex]

    return updatedAddress
  }
}
