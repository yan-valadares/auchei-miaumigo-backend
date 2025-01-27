import { PrismaAnimalsRepository } from '@/repositories/prisma/prisma-animals-repository'
import { DeleteAnimalUseCase } from '../delete-animal'
import { PrismaRequestsRepository } from '@/repositories/prisma/prisma-requests-repository'

export function makeDeleteAnimalUseCase() {
  const prismaAnimalsRepository = new PrismaAnimalsRepository()
  const prismaRequestsRepository = new PrismaRequestsRepository()
  const deleteAnimalUseCase = new DeleteAnimalUseCase(
    prismaAnimalsRepository,
    prismaRequestsRepository
  )

  return deleteAnimalUseCase
}
