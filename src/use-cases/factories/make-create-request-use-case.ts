import { PrismaTutorsRepository } from '@/repositories/prisma/prisma-tutors-repository'
import { CreateRequestUseCase } from '../create-request'
import { PrismaAnimalsRepository } from '@/repositories/prisma/prisma-animals-repository'
import { PrismaRequestsRepository } from '@/repositories/prisma/prisma-requests-repository'

export function makeCreateRequestUseCase() {
  const prismaTutorRepository = new PrismaTutorsRepository()
  const prismaAnimalsRepository = new PrismaAnimalsRepository()
  const prismaRequestsRepository = new PrismaRequestsRepository()
  const createRequestUseCase = new CreateRequestUseCase(
    prismaRequestsRepository,
    prismaAnimalsRepository,
    prismaTutorRepository
  )

  return createRequestUseCase
}
