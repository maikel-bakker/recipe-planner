import moment from "moment";
import React from "react";
import getRecipes from "../services/contentful/get-recipes";
import Planner from "../components/planner";
import {RecipeCollection} from "../domains/recipes/models";
import DataProvider from "../domains/data-provider";
import {WeekPlanningCollection} from "../domains/week-planning/models";
import getWeekPlanningItems from "../services/contentful/get-week-planning-items";

interface Props {
  recipes: RecipeCollection;
  weekPlanningItems: WeekPlanningCollection;
}

export default function Home (props: Props) {
  const { recipes, weekPlanningItems } = props

  return (
    <>
      <DataProvider
        initialRecipes={recipes}
        initialWeekPlanningItems={weekPlanningItems}
      >
        <Planner />
      </DataProvider>
    </>
  )
}

export async function getServerSideProps () {
  const recipes = await getRecipes()
  const weekPlanningItems = await getWeekPlanningItems()

  return {
    props: {
      recipes,
      weekPlanningItems
    }
  }
}
