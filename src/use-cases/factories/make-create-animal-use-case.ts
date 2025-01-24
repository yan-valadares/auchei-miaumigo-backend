import { CreateAnimalUseCase } from '../create-animal'
import { PrismaAnimalsRepository } from '@/repositories/prisma/prisma-animals-repository'

export function makeCreateAnimalUseCase() {
  const animalsRepository = new PrismaAnimalsRepository()
  const createAnimalUseCase = new CreateAnimalUseCase(animalsRepository)

  return createAnimalUseCase
}
