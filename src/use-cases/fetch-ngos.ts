import type { NgosRepository } from 'ngos-repository'
import type { Ngo } from '@prisma/client'

interface FetchNgosUseCaseParams {
  state?: string
  city?: string
  page: number
}

interface FetchNgosUseCaseResponse {
  ngos: Ngo[]
}

export class FetchNgosUseCase {
  constructor(private ngoRepository: NgosRepository) {}

  async execute({
    page,
    state,
    city,
  }: FetchNgosUseCaseParams): Promise<FetchNgosUseCaseResponse> {
    const location = { state, city }
    const ngos = await this.ngoRepository.findMany(page, location)

    return { ngos }
  }
}
