import { PrismaAnimalsRepository } from '@/repositories/prisma/prisma-animals-repository'
import { FetchAnimalsUseCase } from '../fetch-animals'

export function makeFetchAnimalsUseCase() {
  const prismaAnimalsRepository = new PrismaAnimalsRepository()
  const fetchAnimalsUseCase = new FetchAnimalsUseCase(prismaAnimalsRepository)

  return fetchAnimalsUseCase
}
