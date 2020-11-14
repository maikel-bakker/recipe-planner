import getWeekPlanning from "./get-week-planning";
import {WeekPlanningInput} from "../../domains/week-planning/models";
import mapDayFields from "./utils/map-day-fields";
import ContentfulManagementClient from "./management-client";

const {
  CONTENTFUL_SPACE_ID,
} = process?.env

export default async function updateWeekPlanning(weekPlanning: WeekPlanningInput) {
  if (!ContentfulManagementClient || !CONTENTFUL_SPACE_ID) return
  const space = await ContentfulManagementClient.getSpace(CONTENTFUL_SPACE_ID)
  const environment = await space.getEnvironment('master')
  if (!weekPlanning.id) return null

  const entry = await environment.getEntry(weekPlanning.id)

  const days = mapDayFields(weekPlanning.days)
  console.log(days)

  entry.fields = {
    ...entry.fields,
    ...days
  }
  const updatedEntry = await entry.update()
  await updatedEntry.publish()
  return getWeekPlanning(updatedEntry.sys.id)
}
