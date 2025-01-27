import type { AnimalsRepository } from '@/repositories/animals-repository'
import type { Animal } from '@prisma/client'

interface FetchAnimalsUseCaseParams {
  state?: string
  city?: string
  animalAge?: string
  animalSpecies?: string
  animalSize?: string
  animalSex?: string
  animalNgo?: string
  page: number
}

interface FetchAnimalsUseCaseResponse {
  animals: Animal[]
}

export class FetchAnimalsUseCase {
  constructor(private animalRepository: AnimalsRepository) {}

  async execute({
    page,
    state,
    animalAge,
    animalNgo,
    animalSex,
    animalSize,
    animalSpecies,
    city,
  }: FetchAnimalsUseCaseParams): Promise<FetchAnimalsUseCaseResponse> {
    const params = {
      state,
      city,
      animalAge,
      animalSpecies,
      animalNgo,
      animalSex,
      animalSize,
    }

    const animals = await this.animalRepository.findMany(page, params)

    return { animals }
  }
}
