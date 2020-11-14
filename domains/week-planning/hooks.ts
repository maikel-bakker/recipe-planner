import {useCallback, useContext, useMemo} from "react";
import {Context} from "../data-provider";
import {ADD_WEEK_PLANNING_ERROR, ADD_WEEK_PLANNING_LOADING, ADD_WEEK_PLANNING_SUCCESS} from "./actions";
import api from "../../services/proxy";
import {WeekPlanningInput} from "./models";
import moment from "moment";

const currentWeekNumber = moment().isoWeek()

export function useWeekPlanning() {
  const { dispatch, weekPlanning } = useContext(Context)

  const addWeekPlanning = useCallback(async (weekPlanningInput: WeekPlanningInput) => {
    try {
      dispatch({ type: ADD_WEEK_PLANNING_LOADING })
      const weekPlanning = await api.addWeekPlanning(weekPlanningInput)

      if (!weekPlanning) dispatch({ type: ADD_WEEK_PLANNING_ERROR, error: new Error('No week planning returned') })

      dispatch({ type: ADD_WEEK_PLANNING_SUCCESS, item: weekPlanning })
    } catch (error) {
      dispatch({ type: ADD_WEEK_PLANNING_ERROR, error })
    }
  },  [ dispatch ])

  const currentWeekPlanning = useMemo(() => weekPlanning.items[currentWeekNumber], [ weekPlanning.items ])

  return {
    ...weekPlanning,
    addWeekPlanning,
    currentWeekPlanning,
    currentWeekNumber
  }
}
