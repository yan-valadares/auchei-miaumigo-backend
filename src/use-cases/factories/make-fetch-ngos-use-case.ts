import { FetchNgosUseCase } from '../fetch-ngos'
import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'

export function makeFetchNgosUseCase() {
  const prismaNgoRepository = new PrismaNgosRepository()
  const fetchNgosUseCase = new FetchNgosUseCase(prismaNgoRepository)

  return fetchNgosUseCase
}
