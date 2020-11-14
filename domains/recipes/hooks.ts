import {useCallback, useContext} from "react";
import {Context} from "../data-provider";
import {ADD_RECIPE_ERROR, ADD_RECIPE_LOADING, ADD_RECIPE_SUCCESS} from "./actions";
import api from "../../services/proxy";

export function useRecipes() {
  const { dispatch, recipes } = useContext(Context)

  const addRecipeByLink = useCallback(async (link: string) => {
    try {
      dispatch({ type: ADD_RECIPE_LOADING })
      const recipe = await api.getScrapedRecipe(link)

      if (!recipe) dispatch({ type: ADD_RECIPE_ERROR, error: new Error('No recipe returned') })

      dispatch({ type: ADD_RECIPE_SUCCESS, recipe })
    } catch (error) {
      dispatch({ type: ADD_RECIPE_ERROR, error })
    }
  },  [])

  return { ...recipes, addRecipeByLink }
}
