import Axios from 'axios'
import cheerio from "cheerio";

export default async function getRecipe (url: string) {
  const page = await Axios.get(url)
  const $ = cheerio.load(page.data)
  return Array.from($('script[type="application/ld+json"]'))
    .map((element) => {
      return JSON.parse($(element).html() as string)
    })
    .find((snippet) => snippet['@type'] === 'Recipe')
}
