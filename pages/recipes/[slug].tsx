import React from "react";
import getRecipeByField from "../../services/contentful/get-recipe-by-field";
import {Recipe as RecipeModel} from "../../domains/recipes/models";
import Recipe from "../../components/recipe";


interface Props {
  recipe: RecipeModel
}

export default function RecipePage (props: Props) {
  const { recipe } = props
  return (
    <Recipe {...recipe} />
  )
}

export async function getServerSideProps ({ query }) {
  const { slug } = query
  const recipe = await getRecipeByField('slug', slug)

  return {
    props: {
      recipe
    }
  }
}
