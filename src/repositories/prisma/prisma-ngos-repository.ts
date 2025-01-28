import type { Ngo, Prisma } from '@prisma/client'
import type { findManyParams, NgosRepository } from '../ngos-repository'
import { prisma } from '@/lib/prisma'

export class PrismaNgosRepository implements NgosRepository {
  async findById(id: string): Promise<Ngo | null> {
    const ngo = await prisma.ngo.findUnique({
      where: {
        id,
      },
    })

    if (!ngo) return null

    const ngoAddress = await prisma.address.findUnique({
      where: { ngo_id: ngo?.id },
    })

    const ngoPhone = await prisma.phone.findUnique({
      where: { ngo_id: ngo?.id },
    })

    const ngoInformations = {
      ...ngo,
      ...(ngoAddress || {}),
      ...(ngoPhone || {}),
    }

    return ngoInformations
  }
  async findByEmail(email: string): Promise<Ngo | null> {
    const ngo = await prisma.ngo.findUnique({
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

    const ngosWithDetails = await Promise.all(
      ngos.map(async ngo => {
        const ngoAddress = await prisma.address.findUnique({
          where: { ngo_id: ngo.id },
        })

        const ngoPhone = await prisma.phone.findUnique({
          where: { ngo_id: ngo.id },
        })

        return {
          ...ngo,
          ...(ngoAddress || {}),
          ...(ngoPhone || {}),
        }
      })
    )

    return ngosWithDetails
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
