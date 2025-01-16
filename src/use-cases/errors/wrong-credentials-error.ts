export class WrongCredentialsError extends Error {
  constructor() {
    super('Credentials do not match!.')
  }
}
