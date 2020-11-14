import React from "react";
import { useField } from "formik";

export const TEST_ATTRIBUTES = {
  LABEL: 'label',
  INPUT: 'input',
  ERROR_MESSAGE: 'error-message'
}

interface Props {
  label: string;
  name: string;
}

export default function FormikTextInput (props: Props) {
  const { label, name, ...restProps } = props
  const [ field, meta ] = useField(name)

  return (
    <>
      <label data-testid={TEST_ATTRIBUTES.LABEL}>
        {label}
        <input data-testid={TEST_ATTRIBUTES.INPUT} {...field} {...restProps} />
      </label>
      {meta.touched && meta.error && (
        <div data-testid={TEST_ATTRIBUTES.ERROR_MESSAGE}>{meta.error}</div>
      )}
    </>
  );
}
