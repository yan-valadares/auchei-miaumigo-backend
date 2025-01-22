import type { Ngo, Prisma } from '@prisma/client'
import type { findManyParams, NgosRepository } from '../ngos-repository'
import { prisma } from '@/lib/prisma'

export class PrismaNgosRepository implements NgosRepository {
  async findById(id: string): Promise<Ngo | null> {
    const ngo = await prisma.ngo.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return ngo
  }
  async findByEmail(email: string): Promise<Ngo | null> {
    const ngo = await prisma.ngo.findUniqueOrThrow({
      where: {
        email,
      },
    })

    return ngo
  }
  async findMany(page: number, params?: findManyParams): Promise<Ngo[]> {
    const ngos = await prisma.ngo.findMany({
      where: {
        address: {
          state: params?.state
            ? { contains: params.state, mode: 'insensitive' }
            : undefined,
          city: params?.city
            ? { contains: params.city, mode: 'insensitive' }
            : undefined,
        },
      },
      take: 12,
      skip: (page - 1) * 12,
    })

    return ngos
  }
  async create(data: Prisma.NgoCreateInput): Promise<Ngo> {
    const ngo = await prisma.ngo.create({
      data,
    })

    return ngo
  }
  async update(data: Prisma.NgoUpdateInput): Promise<Ngo> {
    const ngoId = data.id?.toString()

    if (ngoId === null) throw new Error()

    const ngo = await prisma.ngo.update({
      where: {
        id: ngoId,
      },
      data,
    })

    return ngo
  }
}
