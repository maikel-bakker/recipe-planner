import {useRecipes} from "../../domains/recipes/hooks";
import {useMemo} from "react";
import Link from 'next/link'

export default function Recipes () {
  const { recipes } = useRecipes()
  const items = useMemo(() => Object.values(recipes), [ recipes ])

  if (!items) {
    return (
      <div>No recipes found</div>
    )
  }

  return (
    <ul>
      {items.map((recipe) => (
        <li key={recipe.id}>
          <Link href={`/recipes/${encodeURIComponent(recipe.slug)}`}>
            <a>
              <h3>{recipe.title}</h3>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
