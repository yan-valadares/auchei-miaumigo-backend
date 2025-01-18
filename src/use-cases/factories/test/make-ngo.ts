import { faker } from '@faker-js/faker'
import { generateRandomNumbersString } from '@/utils/random-numbers-generator'
import type { NgoRegisterUseCaseParams } from '@/use-cases/ngo-register'
import type { Ngo } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { hash } from 'bcryptjs'

export function makeCompleteNgo(
  override: Partial<NgoRegisterUseCaseParams> = {},
  id?: string
) {
  const fakePassword = faker.internet.password()

  const ngo: NgoRegisterUseCaseParams = {
    ngoName: faker.company.name(),
    adminFirstName: faker.person.firstName(),
    adminLastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: fakePassword,
    confirmPassword: fakePassword,
    phone: generateRandomNumbersString(11),
    cep: generateRandomNumbersString(8),
    state: faker.location.state({ abbreviated: true }),
    city: faker.location.city(),
    streetName: faker.location.street(),
    houseNumber: generateRandomNumbersString(3),
    logoUrl: faker.internet.url(),
    id,
    ...override,
  }
  return ngo
}

export async function makeNgo(override: Partial<Ngo> = {}, id?: string) {
  const fakePassword = faker.internet.password()
  const fakePasswordHashed = await hash(fakePassword, 6)

  const ngo: Ngo = {
    adminFirstName: faker.person.firstName(),
    adminLastName: faker.person.lastName(),
    email: faker.internet.email(),
    ngoName: faker.company.name(),
    password: fakePasswordHashed,
    logoUrl: faker.internet.url(),
    created_at: new Date(),
    id: id ?? randomUUID(),
    ...override,
  }
  return ngo
}
