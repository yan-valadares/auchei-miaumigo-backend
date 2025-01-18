export class EmailAlrealdyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
