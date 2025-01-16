import { prisma } from '@/lib/prisma'
import type { Prisma, Tutor } from '@prisma/client'
import type { TutorsRepository } from '../tutors-repository'

export class PrismaTutorsRepository implements TutorsRepository {
  async findById(id: string): Promise<Tutor | null> {
    const tutor = await prisma.tutor.findUnique({
      where: {
        id,
      },
    })

    return tutor
  }
  async findByEmail(email: string) {
    const tutor = await prisma.tutor.findUnique({
      where: {
        email,
      },
    })

    return tutor
  }
  async create(data: Prisma.TutorCreateInput) {
    const tutor = await prisma.tutor.create({
      data,
    })

    return tutor
  }
}
