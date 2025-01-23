import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'
import { GetNgoProfileUseCase } from '../get-ngo-profile'

export function makeGetNgoProfileUseCase() {
  const prismaNgosRepository = new PrismaNgosRepository()
  const getNgoProfileUseCase = new GetNgoProfileUseCase(prismaNgosRepository)

  return getNgoProfileUseCase
}
