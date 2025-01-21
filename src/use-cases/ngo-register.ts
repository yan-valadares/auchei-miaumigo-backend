import type { AddressesRepository } from '@/repositories/addresses-repository'
import type { PhonesRepository } from '@/repositories/phones-repository'
import { hash } from 'bcryptjs'
import { EmailAlrealdyExistsError } from './errors/email-already-exists-error'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

import type { NgosRepository } from '@/repositories/ngos-repository'
import type { Ngo } from '@prisma/client'

export interface NgoRegisterUseCaseParams {
  id?: string
  ngoName: string
  adminFirstName: string
  adminLastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  cep: string
  state: string
  city: string
  streetName: string
  houseNumber: string
  logoUrl: string
}

interface NgoRegisterUseCaseResponse {
  ngo: Ngo
}

export class NgoRegisterUseCase {
  constructor(
    private addressesRepository: AddressesRepository,
    private phonesRepository: PhonesRepository,
    private ngosRepository: NgosRepository
  ) {}
  async execute({
    ngoName,
    adminFirstName,
    adminLastName,
    email,
    password,
    confirmPassword,
    phone,
    cep,
    state,
    city,
    streetName,
    houseNumber,
    logoUrl,
  }: NgoRegisterUseCaseParams): Promise<NgoRegisterUseCaseResponse> {
    if (password !== confirmPassword) {
      throw new WrongCredentialsError()
    }

    const ngoWithSameEmail = await this.ngosRepository.findByEmail(email)

    if (ngoWithSameEmail) throw new EmailAlrealdyExistsError()

    const ngoPhone = await this.phonesRepository.create({
      number: phone,
    })

    const ngoAddress = await this.addressesRepository.create({
      cep,
      city,
      state,
      houseNumber,
      streetName,
      houseType: 'ngo',
    })

    const hashedPassword = await hash(password, 6)

    const ngo = await this.ngosRepository.create({
      logoUrl,
      adminFirstName,
      adminLastName,
      email,
      ngoName,
      password: hashedPassword,
      phone: {
        connect: { id: ngoPhone.id },
      },
      address: {
        connect: { id: ngoAddress.id },
      },
    })

    return { ngo }
  }
}
