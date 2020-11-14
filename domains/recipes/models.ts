export interface Recipe {
  id: string;
  title: string;
  link?: string;
  ingredients?: string[],
  steps?: string[]
}

export interface RecipeCollection {
  [id: string]: Recipe
}

export interface RecipeInput {
  title: string;
  link?: string;
  ingredients?: string[],
  steps?: string[]
}
