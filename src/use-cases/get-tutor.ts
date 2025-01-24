import type { TutorsRepository } from '@/repositories/tutors-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { Tutor } from '@prisma/client'

interface GetTutorUseCaseRequest {
  tutorId: string
}

interface GetTutorUseCaseResponse {
  tutor: Tutor
}

export class GetTutorUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}

  async execute({
    tutorId,
  }: GetTutorUseCaseRequest): Promise<GetTutorUseCaseResponse> {
    const tutor = await this.tutorsRepository.findById(tutorId)

    if (!tutor) throw new ResourceNotFoundError()

    return { tutor }
  }
}
