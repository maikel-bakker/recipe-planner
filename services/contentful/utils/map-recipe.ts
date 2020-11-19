function mapList (items: any, type: string) {
  const list = items.content.find((content: any) => content.nodeType === type)
  return list.content.map((node: any) =>{
    return node.content[0].content[0].value
  })
}

export default function mapRecipe (item: any) {
  return {
    id: item.sys.id,
    title: item.fields.title,
    link: item.fields.link,
    slug: item.fields.slug,
    ingredients: item.fields.ingredients && mapList(item.fields.ingredients, 'unordered-list'),
    steps: item.fields.steps && mapList(item.fields.steps, 'ordered-list'),
    rawItem: item
  }
}
