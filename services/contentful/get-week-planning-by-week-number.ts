import ContentfulClient from "./client";
import mapWeekPlanning from "./utils/map-week-planning";

const CONTENT_TYPE = 'weekPlanning'

export default async function getWeekPlanningByWeekNumber (weekNumber: number) {
  if (!ContentfulClient) return null
  const { items: entries } = await ContentfulClient.getEntries({
    content_type: CONTENT_TYPE,
    limit: 1,
    include: 5,
    'fields.weekNumber': weekNumber
  })

  return mapWeekPlanning(entries[0])
}
