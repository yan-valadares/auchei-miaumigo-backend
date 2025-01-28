import type { AnimalsRepository } from '@/repositories/animals-repository'
import type { RequestsRepository } from '@/repositories/requests-repository'
import type { TutorsRepository } from '@/repositories/tutors-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { Request } from '@prisma/client'

export interface CreateRequestUseCaseParams {
  tutorId: string
  animalId: string
}

interface CreateRequestUseCaseResponse {
  request: Request
}

export class CreateRequestUseCase {
  constructor(
    private requestsRepository: RequestsRepository,
    private animalsRepository: AnimalsRepository,
    private tutorsRepository: TutorsRepository
  ) {}

  async execute({
    animalId,
    tutorId,
  }: CreateRequestUseCaseParams): Promise<CreateRequestUseCaseResponse> {
    const tutor = await this.tutorsRepository.findById(tutorId)

    if (!tutor) throw new ResourceNotFoundError()

    const animal = await this.animalsRepository.findById(animalId)

    if (!animal) throw new ResourceNotFoundError()

    const request = await this.requestsRepository.create({
      tutorId,
      animalId,
      status: 'analysing',
    })

    return { request }
  }
}
