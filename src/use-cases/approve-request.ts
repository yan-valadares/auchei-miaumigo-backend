import type { NgosRepository } from '@/repositories/ngos-repository'
import type { RequestsRepository } from '@/repositories/requests-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface ApproveRequestUseCaseParams {
  ngoId: string
  requestId: string
}

export class ApproveRequestUseCase {
  constructor(
    private ngosRepository: NgosRepository,
    private requestsRepository: RequestsRepository
  ) {}

  async execute({
    ngoId,
    requestId,
  }: ApproveRequestUseCaseParams): Promise<void> {
    const ngo = await this.ngosRepository.findById(ngoId)

    if (!ngo) throw new WrongCredentialsError()

    const request = await this.requestsRepository.findById(requestId)

    if (!request) throw new ResourceNotFoundError()

    await this.requestsRepository.approve(requestId)
  }
}
