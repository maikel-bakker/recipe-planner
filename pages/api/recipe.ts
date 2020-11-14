import { NextApiRequest, NextApiResponse } from 'next'
import addRecipe from "../../services/contentful/add-recipe";
import addRecipeByLink from "../../services/contentful/add-recipe-by-link";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { scrape } = req.query
    try {
      const recipe = scrape ? await addRecipeByLink(req.body.link) : await addRecipe(req.body)
      return res.json(recipe)
    } catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }
  return res.status(404)
}
