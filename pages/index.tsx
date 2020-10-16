import Head from 'next/head'
import styles from '../styles/Home.module.css'
import getRecipes from "../services/contentful/get-recipes";
import {Recipe} from "../interfaces/recipe";
import Planner from "../components/planner";
import RecipeContext from "../domains/recipes/context";
import getRecipe from "../services/scraper/get-recipe";
import cheerio from "cheerio";
import {AxiosResponse} from 'axios'

interface Props {
  recipes: Recipe[]
}

export default function Home (props: Props) {
  const { recipes } = props
  return (
    <RecipeContext.Provider value={{ recipes }}>
      <Planner />
    </RecipeContext.Provider>
  )
}

Home.getInitialProps = async () => {
  const recipes = await getRecipes()
  if (recipes) {
    const recipe = await getRecipe(recipes[0].link)
    console.log(recipe)
  }

  return {
    recipes
  }
}
