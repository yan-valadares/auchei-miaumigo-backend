import type { NgosRepository } from 'ngos-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { Ngo } from '@prisma/client'

interface GetNgoProfileUseCaseRequest {
  ngoId: string
}

interface GetNgoProfileUseCaseResponse {
  ngo: Ngo
}

export class GetNgoProfileUseCase {
  constructor(private ngosRepository: NgosRepository) {}

  async execute({
    ngoId,
  }: GetNgoProfileUseCaseRequest): Promise<GetNgoProfileUseCaseResponse> {
    const ngo = await this.ngosRepository.findById(ngoId)

    if (!ngo) throw new ResourceNotFoundError()

    return { ngo }
  }
}
