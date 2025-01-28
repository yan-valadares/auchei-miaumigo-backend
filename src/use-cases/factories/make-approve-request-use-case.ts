import { PrismaRequestsRepository } from '@/repositories/prisma/prisma-requests-repository'
import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'
import { ApproveRequestUseCase } from '../approve-request'

export function makeApproveRequestUseCase() {
  const prismaNgosRepository = new PrismaNgosRepository()
  const prismaRequestsRepository = new PrismaRequestsRepository()
  const approveRequestUseCase = new ApproveRequestUseCase(
    prismaNgosRepository,
    prismaRequestsRepository
  )

  return approveRequestUseCase
}
