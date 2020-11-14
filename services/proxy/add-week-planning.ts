import Axios from 'axios'
import {WeekPlanningInput} from "../../domains/week-planning/models";

export default async function addWeekPlanning (weekPlanningInput: WeekPlanningInput) {
  const { data: weekPlanning } = await Axios.post('/api/week-planning', weekPlanningInput)

  return weekPlanning
}
