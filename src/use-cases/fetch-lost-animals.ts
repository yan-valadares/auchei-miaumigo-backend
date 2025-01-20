import type { LostAnimalsRepository } from '@/repositories/lost-animals-repository'
import type { LostAnimal } from '@prisma/client'

interface FetchLostAnimalsUseCaseParams {
  state?: string
  city?: string
  page: number
}

interface FetchLostAnimalsUseCaseResponse {
  lostAnimals: LostAnimal[]
}

export class FetchLostAnimalsUseCase {
  constructor(private lostanimalRepository: LostAnimalsRepository) {}

  async execute({
    page,
    state,
    city,
  }: FetchLostAnimalsUseCaseParams): Promise<FetchLostAnimalsUseCaseResponse> {
    const params = {
      state,
      city,
    }
    const lostAnimals = await this.lostanimalRepository.findMany(page, params)

    return { lostAnimals }
  }
}
