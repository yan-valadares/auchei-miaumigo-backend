import { GetLostAnimalUseCase } from '../get-lost-animal'
import { PrismaLostAnimalsRepository } from '@/repositories/prisma/prisma-lost-animals-repository'

export function makeGetLostAnimalUseCase() {
  const prismaLostAnimalsRepository = new PrismaLostAnimalsRepository()
  const getLostAnimalUseCase = new GetLostAnimalUseCase(
    prismaLostAnimalsRepository
  )

  return getLostAnimalUseCase
}
