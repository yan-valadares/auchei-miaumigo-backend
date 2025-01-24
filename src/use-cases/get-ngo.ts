import type { NgosRepository } from '@/repositories/ngos-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { Ngo } from '@prisma/client'

interface GetNgoUseCaseRequest {
  ngoId: string
}

interface GetNgoUseCaseResponse {
  ngo: Ngo
}

export class GetNgoUseCase {
  constructor(private ngosRepository: NgosRepository) {}

  async execute({
    ngoId,
  }: GetNgoUseCaseRequest): Promise<GetNgoUseCaseResponse> {
    const ngo = await this.ngosRepository.findById(ngoId)

    if (!ngo) throw new ResourceNotFoundError()

    return { ngo }
  }
}
