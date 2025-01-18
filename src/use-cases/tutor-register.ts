import type { AddressesRepository } from '@/repositories/addresses-repository'
import type { PhonesRepository } from '@/repositories/phones-repository'
import type { TutorsRepository } from '@/repositories/tutors-repository'
import { hash } from 'bcryptjs'
import { EmailAlrealdyExistsError } from './errors/email-already-exists-error'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import type { Tutor } from '@prisma/client'

export interface TutorRegisterUseCaseParams {
  id?: string | null
  avatar: string
  cep: string
  city: string
  cpf: string
  email: string
  firstName: string
  houseNumber: string
  houseType: string
  lastName: string
  password: string
  confirmPassword: string
  phone: string
  state: string
  streetName: string
}

interface TutorRegisterUseCaseResponse {
  tutor: Tutor
}

export class TutorRegisterUseCase {
  constructor(
    private addressesRepository: AddressesRepository,
    private phonesRepository: PhonesRepository,
    private tutorsRepository: TutorsRepository
  ) {}
  async execute({
    avatar,
    cep,
    city,
    cpf,
    email,
    firstName,
    houseNumber,
    houseType,
    lastName,
    password,
    confirmPassword,
    phone,
    state,
    streetName,
  }: TutorRegisterUseCaseParams): Promise<TutorRegisterUseCaseResponse> {
    if (password !== confirmPassword) {
      throw new WrongCredentialsError()
    }

    const tutorWithSameEmail = await this.tutorsRepository.findByEmail(email)

    if (tutorWithSameEmail) throw new EmailAlrealdyExistsError()

    const tutorPhone = await this.phonesRepository.create({
      number: phone,
    })

    const tutorAddress = await this.addressesRepository.create({
      cep,
      city,
      state,
      houseNumber,
      houseType,
      streetName,
    })

    const hashedPassword = await hash(password, 6)

    const tutor = await this.tutorsRepository.create({
      avatarUrl: avatar,
      firstName,
      lastName,
      email,
      cpf,
      password: hashedPassword,
      phone: {
        connect: { id: tutorPhone.id },
      },
      address: {
        connect: { id: tutorAddress.id },
      },
    })

    return { tutor }
  }
}
