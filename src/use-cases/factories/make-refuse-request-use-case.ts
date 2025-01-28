import { PrismaRequestsRepository } from '@/repositories/prisma/prisma-requests-repository'
import { RefuseRequestUseCase } from '../refuse-request'
import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'

export function makeRefuseRequestUseCase() {
  const prismaNgosRepository = new PrismaNgosRepository()
  const prismaRequestsRepository = new PrismaRequestsRepository()
  const refuseRequestUseCase = new RefuseRequestUseCase(
    prismaNgosRepository,
    prismaRequestsRepository
  )

  return refuseRequestUseCase
}
