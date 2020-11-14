import {fireEvent, render, waitFor} from "@testing-library/react";
import { Formik, Form } from 'formik'
import React from "react";
import FormikTextInput, {TEST_ATTRIBUTES} from "./index";
import * as yup from 'yup'

const FORM_TEST_ID = 'form'

const setup = () => {
  const schema = yup.object().shape({
    test: yup.string().required('Test is required')
  })
  const utils = render(
    <Formik
      initialValues={{ test: '' }}
      onSubmit={async (values) => values}
      validationSchema={schema}
    >
      <Form data-testid={FORM_TEST_ID}>
        <FormikTextInput label="Test" name="test" />
      </Form>
    </Formik>
  )

  const elements = {
    label: utils.getByTestId(TEST_ATTRIBUTES.LABEL),
    input: utils.getByTestId(TEST_ATTRIBUTES.INPUT),
    form: utils.getByTestId(FORM_TEST_ID)
  }

  return {
    ...elements,
    ...utils
  }
}

describe('Renders the correct elements', () => {
  it('Renders label', () => {
    const { label } = setup()
    expect(label).toBeTruthy()
  })

  it('Renders input', () => {
    const { input } = setup()
    expect(input).toBeTruthy()
  })

  it('Renders error', async () => {
    const { form, getByTestId } = setup()

    fireEvent.submit(form)

    await waitFor( () => {
      expect(getByTestId(TEST_ATTRIBUTES.ERROR_MESSAGE)).toBeTruthy()
    })
  })
})
