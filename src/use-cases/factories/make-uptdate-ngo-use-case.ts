import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'
import { UpdateNgoUseCase } from '../update-ngo'

export function makeUpdateNgoUseCase() {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaPhonesRepository = new PrismaPhonesRepository()
  const prismaNgosRepository = new PrismaNgosRepository()
  const updateNgoUseCase = new UpdateNgoUseCase(
    prismaAddressesRepository,
    prismaPhonesRepository,
    prismaNgosRepository
  )

  return updateNgoUseCase
}
