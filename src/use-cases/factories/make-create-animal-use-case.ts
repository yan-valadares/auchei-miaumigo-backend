import { CreateAnimalUseCase } from '../create-animal'
import { PrismaAnimalsRepository } from '@/repositories/prisma/prisma-animals-repository'

export function makeCreateAnimalUseCase() {
  const prismaAnimalsRepository = new PrismaAnimalsRepository()
  const createAnimalUseCase = new CreateAnimalUseCase(prismaAnimalsRepository)

  return createAnimalUseCase
}
