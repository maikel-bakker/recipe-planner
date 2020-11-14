import {Recipe} from "../recipes/models";

export interface WeekPlanningInputDays {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface WeekPlanningInput {
  id?: string;
  title?: string;
  weekNumber: number;
  days: WeekPlanningInputDays
}

export interface WeekPlanning {
  id: string
  title?: string;
  weekNumber: number;
  days: {
    [key: string]: Recipe;
  }
}

export interface WeekPlanningCollection {
  [key: number]: WeekPlanning
}
