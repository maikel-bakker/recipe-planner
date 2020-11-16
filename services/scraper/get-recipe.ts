import Axios from 'axios'
import cheerio from "cheerio";
import {RecipeInput} from "../../domains/recipes/models";
import { decode } from 'he'

function getSteps (recipeSnippet: any) {
  const $ = cheerio.load(recipeSnippet.recipeInstructions)

  return Array
    .from($('ol > li'))
    .map((item) => {
      const html = $(item).html() || ''
      return html && decode(html)
    })
    .filter(Boolean)
}


export default async function getRecipe (url: string) : Promise<RecipeInput> {
  const page = await Axios.get(url)
  const $ = cheerio.load(page.data)
  const recipeSnippet =  Array.from($('script[type="application/ld+json"]'))
    .map((element) => {
      return JSON.parse($(element).html() as string)
    })
    .find((snippet) => snippet['@type'] === 'Recipe')

  const steps = getSteps(recipeSnippet)

  console.log(steps)

  return {
    title: recipeSnippet.name,
    link: url,
    ingredients: recipeSnippet.recipeIngredient,
    steps: steps
  }
}
