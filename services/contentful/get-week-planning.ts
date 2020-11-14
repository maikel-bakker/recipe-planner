import ContentfulClient from "./client";
import mapWeekPlanning from "./utils/map-week-planning";

export default async function getWeekPlanning (id: string) {
  if (!ContentfulClient) return null
  const entry = await ContentfulClient.getEntry(id)

  return mapWeekPlanning(entry)
}
