import { PrismaTutorsRepository } from '@/repositories/prisma/prisma-tutors-repository'
import { GetTutorUseCase } from '../get-tutor'

export function makeGetTutorUseCase() {
  const prismaTutorsRepository = new PrismaTutorsRepository()
  const getTutorUseCase = new GetTutorUseCase(prismaTutorsRepository)

  return getTutorUseCase
}
