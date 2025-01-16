import type { TutorsRepository } from '@/repositories/tutors-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { compare } from 'bcryptjs'
import type { Tutor } from '@prisma/client'

interface TutorAuthenticateUseCaseRequest {
  email: string
  password: string
}

interface TutorAuthenticateUseCaseResponse {
  tutor: Tutor
}

export class TutorAuthenticateUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}

  async authenticate({
    email,
    password,
  }: TutorAuthenticateUseCaseRequest): Promise<TutorAuthenticateUseCaseResponse> {
    const tutor = await this.tutorsRepository.findByEmail(email)

    if (!tutor) throw new WrongCredentialsError()

    const doesPasswordMatch = await compare(password, tutor.password)

    if (!doesPasswordMatch) throw new WrongCredentialsError()

    return { tutor }
  }
}
