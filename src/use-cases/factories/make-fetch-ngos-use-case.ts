import { FetchNgosUseCase } from '../fetch-ngos'
import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'

export function makeFetchNgosUseCase() {
  const ngoRepository = new PrismaNgosRepository()
  const fetchNgosUseCase = new FetchNgosUseCase(ngoRepository)

  return fetchNgosUseCase
}
