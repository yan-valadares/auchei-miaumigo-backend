import type { TutorsRepository } from '@/repositories/tutors-repository'
import type { Tutor } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetTutorProfileUseCaseRequest {
  tutorId: string
}

interface GetTutorProfileUseCaseResponse {
  tutor: Tutor
}

export class GetTutorProfileUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}

  async execute({
    tutorId,
  }: GetTutorProfileUseCaseRequest): Promise<GetTutorProfileUseCaseResponse> {
    const tutor = await this.tutorsRepository.findById(tutorId)

    if (!tutor) throw new ResourceNotFoundError()

    return { tutor }
  }
}
