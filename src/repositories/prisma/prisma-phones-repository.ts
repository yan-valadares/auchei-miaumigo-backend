import { prisma } from '@/lib/prisma'
import type { Phone, Prisma } from '@prisma/client'
import type { PhonesRepository } from '../phones-repository'

export class PrismaPhonesRepository implements PhonesRepository {
  async create(data: Prisma.PhoneCreateInput) {
    const phone = await prisma.phone.create({
      data,
    })

    return phone
  }

  async update(data: Prisma.PhoneUpdateInput): Promise<Phone> {
    const phoneId = data.id?.toString()

    if (phoneId === null) throw new Error()

    const phone = await prisma.phone.update({
      where: { id: phoneId },
      data,
    })

    return phone
  }

  async findByTutorId(tutorId: string): Promise<Phone | null> {
    const phone = await prisma.phone.findUniqueOrThrow({
      where: { tutor_id: tutorId },
    })

    return phone
  }
  async findByNgoId(NgoId: string): Promise<Phone | null> {
    const phone = await prisma.phone.findUniqueOrThrow({
      where: { ngo_id: NgoId },
    })

    return phone
  }
}
