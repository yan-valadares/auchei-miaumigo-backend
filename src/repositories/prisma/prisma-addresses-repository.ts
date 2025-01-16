import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import { AddresssRepository } from '../addresses-repository'

export class PrismaAddressesRepository implements AddresssRepository {
  async create(data: Prisma.AddressCreateInput) {
    const address = await prisma.address.create({
      data,
    })

    return address
  }
}
