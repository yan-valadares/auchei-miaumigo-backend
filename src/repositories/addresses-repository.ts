import { Prisma, Address } from '@prisma/client'

export interface AddresssRepository {
  create(data: Prisma.AddressCreateInput): Promise<Address>
}
