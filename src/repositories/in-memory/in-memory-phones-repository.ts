import type { Prisma, Phone } from '@prisma/client'
import type { PhonesRepository } from '../phones-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPhonesRepository implements PhonesRepository {
  public items: Phone[] = []
  async create(data: Prisma.PhoneCreateInput): Promise<Phone> {
    const phone = {
      id: randomUUID(),
      number: data.number,
      ngo_id: null,
      tutor_id: null,
    }

    this.items.push(phone)

    return phone
  }
}
