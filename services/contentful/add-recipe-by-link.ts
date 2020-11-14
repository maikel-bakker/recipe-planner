import getRecipe from "../scraper/get-recipe";
import addRecipe from "./add-recipe";

export default async function addRecipeByLink (link: string) {
  const recipe = await getRecipe(link)
  return await addRecipe(recipe)
}
