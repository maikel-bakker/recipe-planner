import ContentfulClient from "./client";
import mapWeekPlanning from "./utils/map-week-planning";

export default async function getWeekPlanningItems () {
  if (!ContentfulClient) return null
  const { items } = await ContentfulClient.getEntries({
    content_type: 'weekPlanning'
  })

  return items.reduce((items, item: any) => {
    return {
      ...items,
      [item.fields.weekNumber]: mapWeekPlanning(item)
    }
  }, {})
}
