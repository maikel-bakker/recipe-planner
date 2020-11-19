import ContentfulClient from "./client";
import mapRecipe from "./utils/map-recipe";

export default async function getRecipeByField (field: string, value: string) {
  if (!ContentfulClient) return null
  const { items } = await ContentfulClient.getEntries({
    content_type: 'recipe',
    [`fields.${field}`]: value,
    limit: 1
  })

  return mapRecipe(items[0])
}
