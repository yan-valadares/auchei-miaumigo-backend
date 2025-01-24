import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { PrismaTutorsRepository } from '@/repositories/prisma/prisma-tutors-repository'
import { UpdateTutorUseCase } from '../update-tutor'

export function makeUpdateTutorUseCase() {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaPhonesRepository = new PrismaPhonesRepository()
  const prismaTutorsRepository = new PrismaTutorsRepository()
  const updateTutorUseCase = new UpdateTutorUseCase(
    prismaAddressesRepository,
    prismaPhonesRepository,
    prismaTutorsRepository
  )

  return updateTutorUseCase
}
