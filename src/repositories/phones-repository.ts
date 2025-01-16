import type { Prisma, Phone } from '@prisma/client'

export interface PhonesRepository {
  create(data: Prisma.PhoneCreateInput): Promise<Phone>
}
