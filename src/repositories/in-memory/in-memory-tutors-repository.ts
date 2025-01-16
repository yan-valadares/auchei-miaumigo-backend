import type { Tutor, Prisma } from '@prisma/client'
import type { TutorsRepository } from '../tutors-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryTutorsRepository implements TutorsRepository {
  public items: Tutor[] = []

  async findById(id: string) {
    const tutor = this.items.find(item => item.id === id)

    if (!tutor) return null

    return tutor
  }

  async findByEmail(email: string) {
    const tutor = this.items.find(item => item.email === email)

    if (!tutor) return null

    return tutor
  }
  async create(data: Prisma.TutorCreateInput) {
    const tutor = {
      id: randomUUID(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      avatarUrl: data.avatarUrl ?? null,
      cpf: data.cpf,
      password: data.password,
      created_at: new Date(),
    }

    this.items.push(tutor)

    return tutor
  }
}
