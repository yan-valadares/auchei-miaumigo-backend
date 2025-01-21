import type { Prisma, Address } from '@prisma/client'

export interface AddressesRepository {
  findByTutorId(tutorId: string): Promise<Address | null>
  findByNgoId(ngoId: string): Promise<Address | null>
  create(data: Prisma.AddressCreateInput): Promise<Address>
  update(data: Prisma.AddressUpdateInput): Promise<Address>
}
