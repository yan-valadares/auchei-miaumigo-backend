import type { NgosRepository } from 'ngos-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { compare } from 'bcryptjs'
import type { Ngo } from '@prisma/client'

interface NgoAuthenticateUseCaseRequest {
  email: string
  password: string
}

interface NgoAuthenticateUseCaseResponse {
  ngo: Ngo
}

export class NgoAuthenticateUseCase {
  constructor(private ngosRepository: NgosRepository) {}

  async authenticate({
    email,
    password,
  }: NgoAuthenticateUseCaseRequest): Promise<NgoAuthenticateUseCaseResponse> {
    const ngo = await this.ngosRepository.findByEmail(email)

    if (!ngo) throw new WrongCredentialsError()

    const doesPasswordMatch = await compare(password, ngo.password)

    if (!doesPasswordMatch) throw new WrongCredentialsError()

    return { ngo }
  }
}
