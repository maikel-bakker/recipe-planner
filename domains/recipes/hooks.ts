import {useContext} from "react";
import RecipeContext from "./context";

export function useRecipes () {
  return useContext(RecipeContext)
}
