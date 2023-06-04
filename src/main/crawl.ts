import axios from 'axios'
import * as cheerio from 'cheerio'

export const crawlNews = async (): Promise<string[]> => {
  const result = await axios.get('https://www.yna.co.kr/news?site=navi_latest_depth01')

  const $ = cheerio.load(result.data)

  const newsList = $('.list-type038 li')

  const newsTitles = newsList.map((_index, element) => $(element).find('.tit-news').text())

  return newsTitles.get()
}
