import {Recipe as RecipeModel} from "../../domains/recipes/models";

export default function Recipe (props: RecipeModel) {
  const {
    title,
    ingredients,
    steps
  } = props

  return (
    <>
      <h1>{title}</h1>
      {ingredients && (
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      )}
      {steps && (
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      )}
    </>
  )
}
