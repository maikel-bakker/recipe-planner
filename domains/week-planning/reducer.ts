import {
  ADD_WEEK_PLANNING_ERROR,
  ADD_WEEK_PLANNING_LOADING,
  ADD_WEEK_PLANNING_SUCCESS
} from "./actions";
import {WeekPlanning, WeekPlanningCollection} from "./models";

export interface WeekPlanningState {
  items: WeekPlanningCollection,
  isLoading: boolean;
  error: Error | false,
  isSuccess: boolean
}

export const initialState: WeekPlanningState = {
  items: {},
  isLoading: false,
  error: false,
  isSuccess: false
}

interface ReducerAction {
  type: string,
  item?: WeekPlanning,
  error?: Error | false
}

export default function reducer (state: WeekPlanningState, action: ReducerAction): WeekPlanningState {
  switch (action.type) {
    case ADD_WEEK_PLANNING_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: false,
        isSuccess: false
      }
    }

    case ADD_WEEK_PLANNING_SUCCESS: {
      if (!action || !action.item) {
        return {
          ...state,
          error: new Error('No item found in action'),
          isLoading: false,
          isSuccess: false
        }
      }

      return {
        ...state,
        items: {
          ...state.items,
          [action.item.weekNumber]: action.item
        },
        error: false,
        isLoading: false,
        isSuccess: true
      }
    }

    case ADD_WEEK_PLANNING_ERROR: {
      return {
        ...state,
        error: action.error || new Error('No error message was provided'),
        isLoading: false,
        isSuccess: false
      }
    }

    default: {
      return state
    }
  }
}
