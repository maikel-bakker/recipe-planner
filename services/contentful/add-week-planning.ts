import {WeekPlanningInput} from "../../domains/week-planning/models";
import ContentfulManagementClient from "./management-client";
import mapDayFields from "./utils/map-day-fields";
import updateWeekPlanning from "./update-week-planning";
import getWeekPlanning from "./get-week-planning";

const {
  CONTENTFUL_SPACE_ID,
} = process?.env

export default async function addWeekPlanning (weekPlanning: WeekPlanningInput) {
  if (!ContentfulManagementClient || !CONTENTFUL_SPACE_ID) return
  const space = await ContentfulManagementClient.getSpace(CONTENTFUL_SPACE_ID)
  const environment = await space.getEnvironment('master')

  if (weekPlanning.id) {
    return await updateWeekPlanning(weekPlanning)
  }

  const days = mapDayFields(weekPlanning.days)

  const entry = await environment.createEntry('weekPlanning', {
    fields: {
      title: {
        'en-US': `Week: ${weekPlanning.weekNumber}`
      },
      weekNumber: {
        'en-US': weekPlanning.weekNumber
      },
      ...days
    }
  })

  await entry.publish()
  return getWeekPlanning(entry.sys.id)
}
