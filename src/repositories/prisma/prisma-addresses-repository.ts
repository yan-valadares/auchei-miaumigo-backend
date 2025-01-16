import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { AddressesRepository } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressCreateInput) {
    const address = await prisma.address.create({
      data,
    })

    return address
  }
}
