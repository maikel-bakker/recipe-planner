import {RecipeCollection} from "../../domains/recipes/models";
import getRecipes from "../../services/contentful/get-recipes";
import DataProvider from "../../domains/data-provider";
import React from "react";
import Recipes from "../../components/recipes";

interface Props {
  recipes: RecipeCollection;
}

export default function RecipesPage (props: Props) {
  const { recipes } = props

  return (
    <DataProvider
      initialRecipes={recipes}
    >
      <h1>Recipes</h1>
      <Recipes />
    </DataProvider>
  )
}

export async function getServerSideProps () {
  const recipes = await getRecipes()

  return {
    props: {
      recipes
    }
  }
}
