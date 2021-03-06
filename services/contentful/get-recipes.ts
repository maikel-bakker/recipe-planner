import ContentfulClient from "./client";
import mapRecipe from "./utils/map-recipe";

export default async function getRecipes () {
  if (!ContentfulClient) return null
  const { items } = await ContentfulClient.getEntries({
    content_type: 'recipe'
  })

  return items.reduce((items, item: any) => {
    return {
      ...items,
      [item.sys.id]: mapRecipe(item)
    }
  }, {})
}
