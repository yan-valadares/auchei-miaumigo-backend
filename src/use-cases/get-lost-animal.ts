import type { LostAnimalsRepository } from '@/repositories/lost-animals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { LostAnimal } from '@prisma/client'

interface GetLostAnimalProfileUseCaseRequest {
  lostAnimalId: string
}

interface GetLostAnimalProfileUseCaseResponse {
  lostAnimal: LostAnimal
}

export class GetLostAnimalProfileUseCase {
  constructor(private lostanimalsRepository: LostAnimalsRepository) {}

  async execute({
    lostAnimalId,
  }: GetLostAnimalProfileUseCaseRequest): Promise<GetLostAnimalProfileUseCaseResponse> {
    const lostAnimal = await this.lostanimalsRepository.findById(lostAnimalId)

    if (!lostAnimal) throw new ResourceNotFoundError()

    return { lostAnimal }
  }
}
