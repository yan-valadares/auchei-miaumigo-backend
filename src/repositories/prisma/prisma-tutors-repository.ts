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

    const tutorAddress = await prisma.address.findUnique({
      where: { tutor_id: tutor?.id },
    })

    const tutorPhone = await prisma.phone.findUnique({
      where: { tutor_id: tutor?.id },
    })

    if (!tutor) return null

    const tutorInformations = {
      ...tutor,
      ...(tutorAddress || {}),
      ...(tutorPhone || {}),
    }

    return tutorInformations
  }

  async update(data: Prisma.TutorUpdateInput): Promise<Tutor> {
    const tutorId = data.id?.toString()

    if (tutorId === null) throw new Error()

    const tutor = await prisma.tutor.update({
      where: { id: tutorId },
      data,
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
