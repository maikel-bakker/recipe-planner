import { NextApiRequest, NextApiResponse } from 'next'
import addWeekPlanning from "../../services/contentful/add-week-planning";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const weekPlanning = await addWeekPlanning(req.body)
      return res.json(weekPlanning)
    } catch (e) {
      console.log(e.message)
      return res.status(500).json(e.message)
    }
  }
  return res.status(404)
}
