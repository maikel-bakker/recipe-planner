import React, {useReducer} from "react";
import combineReducers from "react-combine-reducers";
import recipeReducer from './recipes/reducer'
import weekPlanningReducer from './week-planning/reducer'
import {initialState as recipesInitialState, RecipesState} from "./recipes/reducer";
import {initialState as weekPlanningInitialState, WeekPlanningState} from "./week-planning/reducer";
import {RecipeCollection} from "./recipes/models";
import {WeekPlanningCollection} from "./week-planning/models";

interface State {
  recipes: RecipesState,
  weekPlanning: WeekPlanningState
}

interface ContextValue extends State {
  dispatch: any
}

export const Context = React.createContext<ContextValue>({
  recipes: recipesInitialState,
  weekPlanning: weekPlanningInitialState,
  dispatch: () => {}
})

const [ reducer , initialState ] = combineReducers({
  recipes: [ recipeReducer, recipesInitialState ],
  weekPlanning: [ weekPlanningReducer, weekPlanningInitialState ]
});

interface Props {
  children: React.ReactNode,
  initialRecipes?: RecipeCollection,
  initialWeekPlanningItems?: WeekPlanningCollection
}

export default function DataProvider (props: Props) {
  const { children, initialRecipes, initialWeekPlanningItems } = props
  const [ state, dispatch ] = useReducer(reducer, {
    ...initialState,
    recipes: {
      ...initialState.recipes,
      recipes: {
        ...initialState.recipes.recipes,
        ...initialRecipes
      }
    },
    weekPlanning: {
      ...initialState.weekPlanning,
      items: {
        ...initialState.weekPlanning.items,
        ...initialWeekPlanningItems
      }
    }
  })

  return (
    <Context.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </Context.Provider>
  )
}
