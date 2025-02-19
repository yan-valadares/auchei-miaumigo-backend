import type { AnimalsRepository } from '@/repositories/animals-repository'
import type { RequestsRepository } from '@/repositories/requests-repository'
import { NotAllowedError } from './errors/not-allowed-error'

export interface DeleteAnimalUseCaseParams {
  animalId: string
  ngoId: string
}

export class DeleteAnimalUseCase {
  constructor(
    private animalsRepository: AnimalsRepository,
    private requestsRepository: RequestsRepository
  ) {}

  async execute({ animalId, ngoId }: DeleteAnimalUseCaseParams): Promise<void> {
    const animalToBeDeleted = await this.animalsRepository.findById(animalId)

    if (animalToBeDeleted?.ngo_id !== ngoId) throw new NotAllowedError()

    await this.requestsRepository.deleteManyByAnimalId(animalId)

    await this.animalsRepository.delete(animalId)
  }
}
