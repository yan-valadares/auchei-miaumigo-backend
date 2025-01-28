import { PrismaLostAnimalsRepository } from '@/repositories/prisma/prisma-lost-animals-repository'
import { FetchOldestLostAnimalsUseCase } from '../fetch-oldest-lost-animals'

export function makeFetchOldestLostAnimalsUseCase() {
  const prismaLostAnimalsRepository = new PrismaLostAnimalsRepository()
  const fetchOldestLostAnimalsUseCase = new FetchOldestLostAnimalsUseCase(
    prismaLostAnimalsRepository
  )

  return fetchOldestLostAnimalsUseCase
}
