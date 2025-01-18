import type { Prisma, Address } from '@prisma/client'
import type { AddressesRepository } from '../addresses-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressesRepository implements AddressesRepository {
  public items: Address[] = []
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
}
