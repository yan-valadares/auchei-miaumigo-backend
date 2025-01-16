export class TutorAlrealdyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
