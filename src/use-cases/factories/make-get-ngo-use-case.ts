import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'
import { GetNgoUseCase } from '../get-ngo'

export function makeGetNgoUseCase() {
  const prismaNgosRepository = new PrismaNgosRepository()
  const getNgoUseCase = new GetNgoUseCase(prismaNgosRepository)

  return getNgoUseCase
}
