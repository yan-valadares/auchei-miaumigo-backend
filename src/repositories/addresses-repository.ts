import type { Prisma, Address } from '@prisma/client'

export interface AddressesRepository {
  create(data: Prisma.AddressCreateInput): Promise<Address>
}
