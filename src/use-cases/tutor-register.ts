import { AddresssRepository } from '@/repositories/addresses-repository'
import { PhonesRepository } from '@/repositories/phones-repository'
import { TutorsRepository } from '@/repositories/tutors-repository'
import { hash } from 'bcryptjs'
import { TutorAlrealdyExistsError } from './errors/tutor-already-exists-error'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface TutorRegisterUseCaseParams {
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

export class TutorRegisterUseCase {
  constructor(
    private phonesRepository: PhonesRepository,
    private addressesRepository: AddresssRepository,
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
  }: TutorRegisterUseCaseParams) {
    if (password !== confirmPassword) {
      throw new WrongCredentialsError()
    }

    const tutorWithSameEmail = await this.tutorsRepository.findByEmail(email)

    if (tutorWithSameEmail) throw new TutorAlrealdyExistsError()

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

    await this.tutorsRepository.create({
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
  }
}
