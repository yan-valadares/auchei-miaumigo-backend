import { PrismaAnimalsRepository } from '@/repositories/prisma/prisma-animals-repository'
import { FetchAnimalsUseCase } from '../fetch-animals'
import { FetchNgoAnimalsUseCase } from '../fetch-ngo-animals'

export function makeFetchNgoAnimalsUseCase() {
  const prismaAnimalsRepository = new PrismaAnimalsRepository()
  const fetchNgoAnimalsUseCase = new FetchNgoAnimalsUseCase(
    prismaAnimalsRepository
  )

  return fetchNgoAnimalsUseCase
}
