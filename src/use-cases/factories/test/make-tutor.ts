import { faker } from '@faker-js/faker'
import type { TutorRegisterUseCaseParams } from '@/use-cases/tutor-register'
import { generateRandomNumbersString } from '@/utils/random-numbers-generator'
import type { Tutor } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { getRandomPropertyType } from '@/utils/get-random-property'

export function makeCompleteTutor(
  override: Partial<TutorRegisterUseCaseParams> = {},
  id?: string
) {
  const fakePassword = faker.internet.password()

  const tutor: TutorRegisterUseCaseParams = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    cpf: generateRandomNumbersString(11),
    avatar: faker.internet.url(),
    cep: generateRandomNumbersString(8),
    city: faker.location.city(),
    houseNumber: generateRandomNumbersString(3),
    houseType: getRandomPropertyType('house', 'apartment'),
    password: fakePassword,
    confirmPassword: fakePassword,
    phone: generateRandomNumbersString(11),
    state: faker.location.state({ abbreviated: true }),
    streetName: faker.location.street(),
    id,
    ...override,
  }

  return tutor
}

export async function makeTutor(override: Partial<Tutor> = {}, id?: string) {
  const fakePassword = faker.internet.password()
  const fakePasswordHashed = await hash(fakePassword, 6)

  const tutor: Tutor = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    cpf: generateRandomNumbersString(11),
    password: fakePasswordHashed,
    avatarUrl: faker.internet.url(),
    created_at: new Date(),
    id: id ?? randomUUID(),
    ...override,
  }
  return tutor
}
