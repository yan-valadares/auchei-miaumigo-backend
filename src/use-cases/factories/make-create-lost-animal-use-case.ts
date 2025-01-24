import { CreateLostAnimalUseCase } from '../create-lost-animal'
import { PrismaLostAnimalsRepository } from '@/repositories/prisma/prisma-lost-animals-repository'

export function makeCreateLostAnimalUseCase() {
  const lostanimalsRepository = new PrismaLostAnimalsRepository()
  const createLostAnimalUseCase = new CreateLostAnimalUseCase(
    lostanimalsRepository
  )

  return createLostAnimalUseCase
}
