import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'
import { NgoRegisterUseCase } from '../ngo-register'

export function makeNgoRegisterUseCase() {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaPhonesRepository = new PrismaPhonesRepository()
  const prismaNgosRepository = new PrismaNgosRepository()
  const ngoRegisterUseCase = new NgoRegisterUseCase(
    prismaAddressesRepository,
    prismaPhonesRepository,
    prismaNgosRepository
  )

  return ngoRegisterUseCase
}
