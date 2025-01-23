import { PrismaTutorsRepository } from '@/repositories/prisma/prisma-tutors-repository'
import { GetTutorProfileUseCase } from '../get-tutor-profile'

export function makeGetTutorProfileUseCase() {
  const prismaTutorsRepository = new PrismaTutorsRepository()
  const getTutorProfileUseCase = new GetTutorProfileUseCase(
    prismaTutorsRepository
  )

  return getTutorProfileUseCase
}
