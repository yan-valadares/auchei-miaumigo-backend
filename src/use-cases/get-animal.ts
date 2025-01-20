import type { AnimalsRepository } from '@/repositories/animals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { Animal } from '@prisma/client'

interface GetAnimalProfileUseCaseRequest {
  animalId: string
}

interface GetAnimalProfileUseCaseResponse {
  animal: Animal
}

export class GetAnimalProfileUseCase {
  constructor(private animalsRepository: AnimalsRepository) {}

  async execute({
    animalId,
  }: GetAnimalProfileUseCaseRequest): Promise<GetAnimalProfileUseCaseResponse> {
    const animal = await this.animalsRepository.findById(animalId)

    if (!animal) throw new ResourceNotFoundError()

    return { animal }
  }
}
