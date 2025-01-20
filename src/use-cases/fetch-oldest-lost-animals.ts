import type { LostAnimalsRepository } from '@/repositories/lost-animals-repository'
import type { LostAnimal } from '@prisma/client'

interface FetchOldestLostAnimalsUseCaseResponse {
  lostAnimals: LostAnimal[]
}

export class FetchOldestLostAnimalsUseCase {
  constructor(private lostAnimalRepository: LostAnimalsRepository) {}

  async execute(): Promise<FetchOldestLostAnimalsUseCaseResponse> {
    const lostAnimals = await this.lostAnimalRepository.findOldest()

    return { lostAnimals }
  }
}
