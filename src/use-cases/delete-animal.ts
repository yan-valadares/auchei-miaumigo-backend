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

    console.log('ngo id: ' + ngoId)
    console.log('id animal achado: ' + animalToBeDeleted?.id)
    console.log('ngo id animal achado: ' + animalToBeDeleted?.ngo_id)

    if (animalToBeDeleted?.ngo_id !== ngoId) throw new NotAllowedError()

    await this.requestsRepository.deleteManyByAnimalId(animalId)

    await this.animalsRepository.delete(animalId)
  }
}
