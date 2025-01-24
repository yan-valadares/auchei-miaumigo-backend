import type { AnimalsRepository } from '@/repositories/animals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { Animal } from '@prisma/client'

interface GetAnimalUseCaseRequest {
  animalId: string
}

interface GetAnimalUseCaseResponse {
  animal: Animal
}

export class GetAnimalUseCase {
  constructor(private animalsRepository: AnimalsRepository) {}

  async execute({
    animalId,
  }: GetAnimalUseCaseRequest): Promise<GetAnimalUseCaseResponse> {
    const animal = await this.animalsRepository.findById(animalId)

    if (!animal) throw new ResourceNotFoundError()

    return { animal }
  }
}
