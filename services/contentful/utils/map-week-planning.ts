import mapRecipe from "./map-recipe";
import cleanObject from "../../../utils/clean-object";

export default function mapWeekPlanning (item: any) {
  return cleanObject({
    id: item.sys.id,
    title: item.fields.title,
    weekNumber: item.fields.weekNumber,
    days: {
      monday: item.fields.monday && mapRecipe(item.fields.monday),
      tuesday: item.fields.tuesday && mapRecipe(item.fields.tuesday),
      wednesday: item.fields.wednesday && mapRecipe(item.fields.wednesday),
      thursday: item.fields.thursday && mapRecipe(item.fields.thursday),
      friday: item.fields.friday && mapRecipe(item.fields.friday),
      saturday: item.fields.saturday && mapRecipe(item.fields.saturday),
      sunday: item.fields.sunday && mapRecipe(item.fields.sunday)
    }
  })
}
