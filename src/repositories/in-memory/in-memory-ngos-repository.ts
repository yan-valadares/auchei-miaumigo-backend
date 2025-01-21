import type { Prisma, Ngo } from '@prisma/client'
import type { findManyParams, NgosRepository } from '../ngos-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryNgosRepository implements NgosRepository {
  public items: Ngo[] = []
  async findMany(page: number, params: findManyParams): Promise<Ngo[]> {
    return this.items.slice((page - 1) * 12, page * 12)
  }

  async findById(id: string) {
    const ngo = this.items.find(item => item.id === id)

    if (!ngo) return null

    return ngo
  }

  async findByEmail(email: string) {
    const ngo = this.items.find(item => item.email === email)

    if (!ngo) return null

    return ngo
  }
  async create(data: Prisma.NgoCreateInput) {
    const ngo = {
      id: randomUUID(),
      ngoName: data.ngoName,
      adminFirstName: data.adminFirstName,
      adminLastName: data.adminLastName,
      email: data.email,
      password: data.password,
      logoUrl: data.logoUrl ?? null,
      created_at: new Date(),
    }

    this.items.push(ngo)

    return ngo
  }

  async update(data: Prisma.TutorUpdateInput): Promise<Ngo> {
    const ngoIndex = this.items.findIndex(item => item.id === data.id)

    this.items[ngoIndex] = {
      ...this.items[ngoIndex],
      ...data,
      id: data.id,
    } as Ngo

    const updatedNgo = this.items[ngoIndex]

    return updatedNgo
  }
}
