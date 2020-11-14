import {WeekPlanning, WeekPlanningInputDays} from "../../../domains/week-planning/models";

export default function mapDayFields(days: WeekPlanningInputDays) {
  return Object.entries(days).reduce((days, [ day, recipeId ]) => {
    return {
      ...days,
      [day]: {
        'en-US': {
          sys: {
            id: recipeId,
            linkType: 'Entry',
            type: 'Link'
          }
        }
      }
    }
  }, {})
}
