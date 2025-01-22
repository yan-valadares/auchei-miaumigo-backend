import type { AnimalsRepository } from '@/repositories/animals-repository'
import type { Animal } from '@prisma/client'
import { NotAllowedError } from './errors/not-allowed-error'

interface FetchNgoAnimalsUseCaseParams {
  ngoId: string
  page: number
}

interface FetchNgoAnimalsUseCaseResponse {
  animals: Animal[]
}

export class FetchNgoAnimalsUseCase {
  constructor(private animalRepository: AnimalsRepository) {}

  async execute({
    page,
    ngoId,
  }: FetchNgoAnimalsUseCaseParams): Promise<FetchNgoAnimalsUseCaseResponse> {
    const animals = await this.animalRepository.findManyByNgoId(page, ngoId)

    if (animals[0].ngo_id !== ngoId) throw new NotAllowedError()

    return { animals }
  }
}
