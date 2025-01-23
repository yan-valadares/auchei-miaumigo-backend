import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'
import { NgoAuthenticateUseCase } from '../ngo-authenticate'

export function makeNgoAuthenticateUseCase() {
  const prismaNgosRepository = new PrismaNgosRepository()
  const ngoAuthenticateUseCase = new NgoAuthenticateUseCase(
    prismaNgosRepository
  )

  return ngoAuthenticateUseCase
}
