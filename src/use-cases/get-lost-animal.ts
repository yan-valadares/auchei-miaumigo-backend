import type { LostAnimalsRepository } from '@/repositories/lost-animals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { LostAnimal } from '@prisma/client'

interface GetLostAnimalUseCaseRequest {
  lostAnimalId: string
}

interface GetLostAnimalUseCaseResponse {
  lostAnimal: LostAnimal
}

export class GetLostAnimalUseCase {
  constructor(private lostAnimalsRepository: LostAnimalsRepository) {}

  async execute({
    lostAnimalId,
  }: GetLostAnimalUseCaseRequest): Promise<GetLostAnimalUseCaseResponse> {
    const lostAnimal = await this.lostAnimalsRepository.findById(lostAnimalId)

    console.log('PASSOU AQUI')

    if (!lostAnimal) throw new ResourceNotFoundError()

    return { lostAnimal }
  }
}
