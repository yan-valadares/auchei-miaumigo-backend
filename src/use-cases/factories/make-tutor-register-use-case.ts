import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { PrismaTutorsRepository } from '@/repositories/prisma/prisma-tutors-repository'
import { TutorRegisterUseCase } from '../tutor-register'

export function makeTutorRegisterUseCase() {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaPhonesRepository = new PrismaPhonesRepository()
  const prismaTutorsRepository = new PrismaTutorsRepository()
  const tutorRegisterUseCase = new TutorRegisterUseCase(
    prismaAddressesRepository,
    prismaPhonesRepository,
    prismaTutorsRepository
  )

  return tutorRegisterUseCase
}
