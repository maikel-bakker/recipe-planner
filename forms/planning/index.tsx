import React, {useCallback, useMemo} from "react";
import {Form, Formik} from 'formik'
import {useRecipes} from "../../domains/recipes/hooks";
import getDays from "../../components/planner/get-days";
import * as yup from "yup";
import FormikInputSelect from "../../components/formik-input-select";
import {useWeekPlanning} from "../../domains/week-planning/hooks";

const days = getDays()

export const TEST_ATTRIBUTES = {
  FORM: 'form',
  LABEL: 'label',
  INPUT: 'input',
  BUTTON: 'button',
  SUCCESS_MESSAGE: 'success-message',
  ERROR_MESSAGE: 'error-message'
}

const schemaDays = days.reduce((schema, day) => ({
  ...schema,
  [day.name.toLowerCase()]: yup.string()
}), {})

const schema = yup.object().shape(schemaDays)

export default function PlanningForm () {
  const { recipes } = useRecipes()
  const {
    currentWeekPlanning,
    addWeekPlanning,
    currentWeekNumber,
    isLoading,
    error,
    isSuccess
  } = useWeekPlanning()

  const weekPlanningTitle = useMemo(() => `Week: ${currentWeekNumber}`, [ currentWeekNumber ])

  const onSubmit = useCallback(async (values) => {
    const weekPlanningInput = {
      ...currentWeekPlanning,
      title: weekPlanningTitle,
      weekNumber: currentWeekNumber,
      days: values
    }
    await addWeekPlanning(weekPlanningInput)
  }, [ addWeekPlanning, currentWeekPlanning, weekPlanningTitle, currentWeekNumber ])

  const initialValues = useMemo(() => {
    return days.reduce((schema, day) => ({
      ...schema,
      [day.name.toLowerCase()]: currentWeekPlanning?.days[day.name.toLowerCase()]?.id || ''
    }), {})
  }, [ currentWeekPlanning ])

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Form data-testid={TEST_ATTRIBUTES.FORM}>
        <h1>{weekPlanningTitle}</h1>
        <ol>
          {days.map((day) => (
            <li key={day.name}>
              <FormikInputSelect label={day.name} name={day.name.toLowerCase()}>
                <option value="">Select a recipe</option>
                {recipes && Object.values(recipes).map((recipe) => (
                  <option
                    key={recipe.id}
                    value={recipe.id}
                    data-id={recipe.id}
                  >
                    {recipe.title}
                  </option>
                ))}
              </FormikInputSelect>
            </li>
          ))}
        </ol>
        <button data-testid={TEST_ATTRIBUTES.BUTTON}>Submit</button>

        {isLoading && (
          <div>Loading...</div>
        )}

        {isSuccess && (
          <div data-testid={TEST_ATTRIBUTES.SUCCESS_MESSAGE}>
            Recipe was successfully added!
          </div>
        )}

        {error && (
          <div data-testid={TEST_ATTRIBUTES.ERROR_MESSAGE}>
            {error.message}
          </div>
        )}
      </Form>
    </Formik>
  )
}
