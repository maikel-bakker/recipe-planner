import ContentfulManagementClient from "./management-client";
import {RecipeInput} from "../../domains/recipes/models";
import mapRecipe from "./utils/map-recipe";
import getRecipe from "./get-recipe";

const {
  CONTENTFUL_SPACE_ID
} = process?.env

function mapArrayToList(items: string[], type: string) {
  return {
    nodeType: 'document',
    data: {},
    content: [
      {
        nodeType: type,
        data: {},
        content: items.map((item: string) => ({
          nodeType: 'list-item',
          data: {},
          content: [{
            nodeType: 'paragraph',
            data: {},
            content: [{
              data: {},
              marks: [],
              nodeType: 'text',
              value: item
            }]
          }]
        }))
      }
    ]
  }
}

export default async function addRecipe (recipe: RecipeInput) {
  if (!ContentfulManagementClient || !CONTENTFUL_SPACE_ID) return
  const space = await ContentfulManagementClient.getSpace(CONTENTFUL_SPACE_ID)
  const environment = await space.getEnvironment('master')

  const fields = Object
    .entries(recipe)
    .reduce((fields, [ key, value ]) => {
      if (key === 'ingredients') {
        value = mapArrayToList(value, 'unordered-list')
      }
      if (key === 'steps') {
        value = mapArrayToList(value, 'ordered-list')
      }
      return {
        ...fields,
        [key]: {
          'en-US': value
        }
      }
    }, {})

  console.log(fields)

  const entry = await environment.createEntry('recipe', {
    fields: fields
  })
  await entry.publish()
  return await getRecipe(entry.sys.id)
}
