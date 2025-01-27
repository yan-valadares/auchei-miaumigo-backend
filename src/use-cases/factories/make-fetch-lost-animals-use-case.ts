import { PrismaLostAnimalsRepository } from '@/repositories/prisma/prisma-lost-animals-repository'
import { FetchLostAnimalsUseCase } from '../fetch-lost-animals'

export function makeFetchLostAnimalsUseCase() {
  const prismaLostAnimalsRepository = new PrismaLostAnimalsRepository()
  const fetchLostAnimalsUseCase = new FetchLostAnimalsUseCase(
    prismaLostAnimalsRepository
  )

  return fetchLostAnimalsUseCase
}
