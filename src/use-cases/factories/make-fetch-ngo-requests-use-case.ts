import { FetchNgoRequestsUseCase } from '../fetch-ngo-requests'
import { PrismaRequestsRepository } from '@/repositories/prisma/prisma-requests-repository'
import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'

export function makeFetchNgoRequestsUseCase() {
  const prismaNgosRepository = new PrismaNgosRepository()
  const prismaRequestsRepository = new PrismaRequestsRepository()
  const fetchNgosRequestUseCase = new FetchNgoRequestsUseCase(
    prismaNgosRepository,
    prismaRequestsRepository
  )

  return fetchNgosRequestUseCase
}
