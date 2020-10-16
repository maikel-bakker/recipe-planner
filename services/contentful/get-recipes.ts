import ContentfulClient from "./client";

export default async function getRecipes () {
  if (!ContentfulClient) return null
  const { items } = await ContentfulClient.getEntries({
    content_type: 'recipe'
  })

  return items.map((item: any) => ({
    ...item.fields,
    id: item.sys.id
  }))
}
