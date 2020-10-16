import React from "react";
import {Recipe} from "../../interfaces/recipe";

interface DefaultValue {
  recipes: Recipe[]
}

const defaultValue : DefaultValue = {
  recipes: []
}

const RecipeContext = React.createContext(defaultValue)

export default RecipeContext
