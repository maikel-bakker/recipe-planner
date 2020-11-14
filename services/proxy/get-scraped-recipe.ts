import Axios from 'axios'

export default async function getScrapedRecipe (link: string) {
  const { data: recipe } = await Axios.post('/api/recipe', { link }, {
    params: {
      scrape: true
    }
  })

  return recipe
}
