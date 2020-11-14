import ContentfulClient from "./client";
import mapRecipe from "./utils/map-recipe";

export default async function getRecipe (id: string) {
  if (!ContentfulClient) return null
  const entry = await ContentfulClient.getEntry(id)

  return mapRecipe(entry)
}
