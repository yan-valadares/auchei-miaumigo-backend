import type { TutorsRepository } from '../tutors-repository'
import { randomUUID } from 'node:crypto'
import type { Prisma, Tutor } from '@prisma/client'

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
    const tutor: Tutor = {
      id: data.id ?? randomUUID(),
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

  async update(data: Prisma.TutorUpdateInput): Promise<Tutor> {
    const tutorIndex = this.items.findIndex(item => item.id === data.id)

    this.items[tutorIndex] = {
      ...this.items[tutorIndex],
      ...data,
      id: data.id,
    } as Tutor

    const updatedTutor = this.items[tutorIndex]

    return updatedTutor
  }
}
