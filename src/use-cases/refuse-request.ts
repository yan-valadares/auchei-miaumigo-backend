import type { NgosRepository } from '@/repositories/ngos-repository'
import type { RequestsRepository } from '@/repositories/requests-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface RefuseRequestUseCaseParams {
  ngoId: string
  requestId: string
}

export class RefuseRequestUseCase {
  constructor(
    private ngosRepository: NgosRepository,
    private requestsRepository: RequestsRepository
  ) {}

  async execute({
    ngoId,
    requestId,
  }: RefuseRequestUseCaseParams): Promise<void> {
    const ngo = await this.ngosRepository.findById(ngoId)

    if (!ngo) throw new WrongCredentialsError()

    const request = await this.requestsRepository.findById(requestId)

    if (!request) throw new ResourceNotFoundError()

    await this.requestsRepository.refuse(requestId)
  }
}
