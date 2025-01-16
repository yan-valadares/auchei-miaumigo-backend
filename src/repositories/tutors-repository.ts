import { Prisma, Tutor } from '@prisma/client'

export interface TutorsRepository {
  findByEmail(email: string): Promise<Tutor | null>
  create(data: Prisma.TutorCreateInput): Promise<Tutor>
}
