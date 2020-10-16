import React, {useEffect, useMemo} from "react";
import moment from "moment";
import {useRecipes} from "../../domains/recipes/hooks";

let dates = []

for (let index = 1; index <= 7; index++) {
  const day = moment().startOf('week').add('days', index)
  dates.push(day)
}

const days = dates.map((date) => ({
  name: date.format('dddd'),
  date: date.format('DD-MM-YYYY'),
  rawDate: date
}))

export default function Planner () {
  const { recipes } = useRecipes()

  return (
    <ol>
      {days.map((day) => (
        <li>
          <h2>{day.name} {day.date}</h2>
          <select>
            {recipes.map((recipe) => (
              <option value={recipe.id}>{recipe.title}</option>
            ))}
          </select>
        </li>
      ))}
    </ol>
  )
}
