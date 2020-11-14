import {fireEvent, render, waitFor} from "@testing-library/react";
import { Formik, Form } from 'formik'
import React from "react";
import FormikTextInput, {TEST_ATTRIBUTES} from "./index";
import * as yup from 'yup'

const FORM_TEST_ID = 'form'
const OPTION_TEST_ID = 'option'

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
        <FormikTextInput label="Select" name="test">
          <option data-testid={`${OPTION_TEST_ID}-1`} value={1}>Option 1</option>
          <option data-testid={`${OPTION_TEST_ID}-2`} value={2}>Option 2</option>
        </FormikTextInput>
      </Form>
    </Formik>
  )

  const elements = {
    label: utils.getByTestId(TEST_ATTRIBUTES.LABEL),
    select: utils.getByTestId(TEST_ATTRIBUTES.SELECT),
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

  it('Renders select', () => {
    const { select } = setup()
    expect(select).toBeTruthy()
  })

  it('Renders select options', () => {
    const { getByTestId } = setup()
    const option1 = getByTestId(`${OPTION_TEST_ID}-1`)
    const option2 = getByTestId(`${OPTION_TEST_ID}-2`)
    expect(option1).toBeTruthy()
    expect(option2).toBeTruthy()
  })

  it('Renders error', async () => {
    const { form, getByTestId } = setup()

    fireEvent.submit(form)

    await waitFor( () => {
      expect(getByTestId(TEST_ATTRIBUTES.ERROR_MESSAGE)).toBeTruthy()
    })
  })
})
