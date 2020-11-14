import {ADD_RECIPE_ERROR, ADD_RECIPE_LOADING, ADD_RECIPE_SUCCESS} from "./actions";
import {Recipe, RecipeCollection} from "./models";

export interface RecipesState {
  recipes: RecipeCollection,
  isLoading: boolean;
  error: Error | false,
  isSuccess: boolean
}

export const initialState: RecipesState = {
  recipes: {},
  isLoading: false,
  error: false,
  isSuccess: false
}

interface ReducerAction {
  type: string,
  recipe?: Recipe,
  error?: Error | false
}

export default function reducer (state: RecipesState, action: ReducerAction): RecipesState {
  switch (action.type) {
    case ADD_RECIPE_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: false,
        isSuccess: false
      }
    }

    case ADD_RECIPE_SUCCESS: {
      if (!action || !action.recipe) {
        return {
          ...state,
          error: new Error('No recipe found in action'),
          isLoading: false,
          isSuccess: false
        }
      }

      return {
        ...state,
        recipes: {
          ...state.recipes,
          [action.recipe.id]: action.recipe
        },
        error: false,
        isLoading: false,
        isSuccess: true
      }
    }

    case ADD_RECIPE_ERROR: {
      return {
        ...state,
        error: action.error || new Error('No error message was provided'),
        isLoading: false,
        isSuccess: false
      }
    }

    default: {
      return state
    }
  }
}
