import type { AnimalsRepository } from '@/repositories/animals-repository'
import type { Animal } from '@prisma/client'
import { NotAllowedError } from './errors/not-allowed-error'

interface FetchNgoAnimalsUseCaseParams {
  animalName?: string
  animalSpecies?: string
  animalSize?: string
  animalSex?: string
  ngoId: string
  page: number
}

interface FetchNgoAnimalsUseCaseResponse {
  animals: Animal[]
}

export class FetchNgoAnimalsUseCase {
  constructor(private animalRepository: AnimalsRepository) {}

  async execute({
    animalName,
    animalSpecies,
    animalSize,
    animalSex,
    page,
    ngoId,
  }: FetchNgoAnimalsUseCaseParams): Promise<FetchNgoAnimalsUseCaseResponse> {
    const params = {
      animalName,
      animalSpecies,
      animalSex,
      animalSize,
    }

    const animals = await this.animalRepository.findManyByNgoId(
      page,
      ngoId,
      params
    )

    if (animals[0].ngo_id !== ngoId) throw new NotAllowedError()

    return { animals }
  }
}
