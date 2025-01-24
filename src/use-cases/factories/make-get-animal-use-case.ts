import { PrismaAnimalsRepository } from '@/repositories/prisma/prisma-animals-repository'
import { GetAnimalUseCase } from '../get-animal'

export function makeGetAnimalUseCase() {
  const prismaAnimalsRepository = new PrismaAnimalsRepository()
  const getAnimalUseCase = new GetAnimalUseCase(prismaAnimalsRepository)

  return getAnimalUseCase
}
