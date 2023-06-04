export const getDynamicContents = async (url: string): Promise<string> => {
  const response = await fetch(url)
  const text = await response.text()
  return text
}
