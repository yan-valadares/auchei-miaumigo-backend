import type { Prisma, Phone } from '@prisma/client'
import type { PhonesRepository } from '../phones-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPhonesRepository implements PhonesRepository {
  public items: Phone[] = []

  async findByTutorId(tutorId: string): Promise<Phone | null> {
    const address = this.items.find(item => item.tutor_id === tutorId)

    return address ?? null
  }
  async findByNgoId(ngoId: string): Promise<Phone | null> {
    const address = this.items.find(item => item.ngo_id === ngoId)

    return address ?? null
  }

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

  async update(data: Prisma.PhoneUpdateInput): Promise<Phone> {
    const phoneIndex = this.items.findIndex(item => item.id === data.id)

    const updatedPhone = this.items[phoneIndex]

    return updatedPhone
  }
}
