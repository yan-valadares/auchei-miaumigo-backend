export function generateRandomNumbersString(quantity: number): string {
  let randomString = ''
  for (let i = 0; i < quantity; i++) {
    randomString += Math.floor(Math.random() * 10)
  }
  return randomString
}
