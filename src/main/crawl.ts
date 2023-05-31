import axios from 'axios'
import * as cheerio from 'cheerio'

export const crawlLOL = async (): Promise<string[]> => {
  const result = await axios.get('https://www.leagueoflegends.com/ko-kr/champions/')

  const html = result.data

  const $ = cheerio.load(html)

  const champions = $('.style__List-sc-13btjky-2').find('a img')

  const championList = champions.map((_index, element) => $(element).attr('src'))

  return championList.get()
}
