import type { NgosRepository } from '@/repositories/ngos-repository'
import type { RequestsRepository } from '@/repositories/requests-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import type { Request } from '@prisma/client'

export interface FetchNgoRequestsUseCaseParams {
  animalName?: string
  animalSpecies?: string
  tutorName?: string
  status?: string
  ngoId: string
  page: number
}

interface FetchNgoRequestsResponse {
  requests: Request[]
}

export class FetchNgoRequestUseCase {
  constructor(
    private ngosRepository: NgosRepository,
    private requestsRepository: RequestsRepository
  ) {}

  async execute({
    animalName,
    animalSpecies,
    tutorName,
    status,
    ngoId,
    page,
  }: FetchNgoRequestsUseCaseParams): Promise<FetchNgoRequestsResponse> {
    const ngo = await this.ngosRepository.findById(ngoId)

    if (!ngo) throw new WrongCredentialsError()

    const params = {
      animalName,
      animalSpecies,
      status,
      tutorName,
    }

    const requests = await this.requestsRepository.findMany(page, ngoId, params)

    return { requests }
  }
}
