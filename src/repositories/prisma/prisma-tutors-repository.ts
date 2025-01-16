import { prisma } from '@/lib/prisma'
import type { Prisma, Tutor } from '@prisma/client'
import { TutorsRepository } from '../tutors-repository'

export class PrismaTutorsRepository implements TutorsRepository {
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
