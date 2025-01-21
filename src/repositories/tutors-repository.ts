import type { Prisma, Tutor } from '@prisma/client'

export interface TutorsRepository {
  findById(id: string): Promise<Tutor | null>
  findByEmail(email: string): Promise<Tutor | null>
  create(data: Prisma.TutorCreateInput): Promise<Tutor>
  update(data: Prisma.TutorUpdateInput): Promise<Tutor>
}
