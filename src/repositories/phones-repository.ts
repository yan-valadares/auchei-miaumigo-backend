import type { Prisma, Phone } from '@prisma/client'

export interface PhonesRepository {
  findByTutorId(tutorId: string): Promise<Phone | null>
  findByNgoId(NgoId: string): Promise<Phone | null>
  create(data: Prisma.PhoneCreateInput): Promise<Phone>
  update(data: Prisma.PhoneUpdateInput): Promise<Phone>
}
