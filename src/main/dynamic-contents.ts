import axios from 'axios'

export const getDynamicContents = async (url: string): Promise<string> => {
  const { data } = await axios.get(url, { responseType: 'document' })
  return data
}
