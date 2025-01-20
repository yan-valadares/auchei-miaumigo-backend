export function getRandomPropertyType(
  firstOption: string,
  secondOption: string,
  thirdOption?: string
): string {
  const hasThirdOption = thirdOption !== undefined && thirdOption !== null

  const options: string[] = hasThirdOption
    ? // biome-ignore lint/style/noNonNullAssertion: <explanation>
      [firstOption, secondOption, thirdOption!]
    : [firstOption, secondOption]

  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
}
