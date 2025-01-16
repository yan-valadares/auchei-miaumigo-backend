import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import { PhonesRepository } from '../phones-repository'

export class PrismaPhonesRepository implements PhonesRepository {
  async create(data: Prisma.PhoneCreateInput) {
    const phone = await prisma.phone.create({
      data,
    })

    return phone
  }
}
