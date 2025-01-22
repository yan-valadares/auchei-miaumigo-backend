import { prisma } from '@/lib/prisma'
import type { Address, Prisma } from '@prisma/client'
import type { AddressesRepository } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressCreateInput) {
    const address = await prisma.address.create({
      data,
    })

    return address
  }

  async update(data: Prisma.AddressUpdateInput): Promise<Address> {
    const addressId = data.id?.toString()

    if (addressId === null) throw new Error()

    const address = await prisma.address.update({
      where: { id: addressId },
      data,
    })

    return address
  }

  async findByTutorId(tutorId: string): Promise<Address | null> {
    const address = await prisma.address.findUniqueOrThrow({
      where: { tutor_id: tutorId },
    })

    return address
  }

  async findByNgoId(ngoId: string): Promise<Address | null> {
    const address = await prisma.address.findUniqueOrThrow({
      where: { ngo_id: ngoId },
    })

    return address
  }
}
