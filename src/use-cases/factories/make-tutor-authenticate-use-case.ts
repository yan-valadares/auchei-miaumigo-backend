import { PrismaTutorsRepository } from '@/repositories/prisma/prisma-tutors-repository'
import { TutorAuthenticateUseCase } from '../tutor-authenticate'

export function makeTutorAuthenticateUseCase() {
  const prismaTutorsRepository = new PrismaTutorsRepository()
  const tutorAuthenticateUseCase = new TutorAuthenticateUseCase(
    prismaTutorsRepository
  )

  return tutorAuthenticateUseCase
}
