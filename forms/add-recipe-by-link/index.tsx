import React, {useCallback, useState} from "react";
import {Form, Formik} from 'formik'
import * as yup from 'yup'
import {useRecipes} from "../../domains/recipes/hooks";
import FormikTextInput from "../../components/formik-input-text";

export const TEST_ATTRIBUTES = {
  FORM: 'form',
  LABEL: 'label',
  INPUT: 'input',
  BUTTON: 'button',
  SUCCESS_MESSAGE: 'success-message',
  ERROR_MESSAGE: 'error-message'
}

const schema = yup.object().shape({
  link: yup.string()
    .required('Link is required')
    .url('Must be an URL')
})

const initialValues = {
  link: ''
}

export default function AddRecipeByLinkForm() {
  const { addRecipeByLink, isLoading, isSuccess, error } = useRecipes()

  const onSubmit = useCallback(async (values) => {
    await addRecipeByLink(values.link)
  }, [ addRecipeByLink ])

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Form data-testid={TEST_ATTRIBUTES.FORM}>
        <FormikTextInput label="Recipe Link" name="link"/>
        <button data-testid={TEST_ATTRIBUTES.BUTTON}>Add Recipe</button>

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
