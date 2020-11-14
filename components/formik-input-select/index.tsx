import React from "react";
import { useField } from "formik";

export const TEST_ATTRIBUTES = {
  LABEL: 'label',
  SELECT: 'select',
  ERROR_MESSAGE: 'error-message'
}

interface Props {
  label: string;
  name: string;
  children: React.ReactNode
}

export default function FormikInputSelect (props: Props) {
  const { label, name, children, ...restProps } = props
  const [ field, meta ] = useField(name)

  return (
    <>
      <label data-testid={TEST_ATTRIBUTES.LABEL}>
        {label}
        <select data-testid={TEST_ATTRIBUTES.SELECT} {...field} {...restProps}>
          {children}
        </select>
      </label>
      {meta.touched && meta.error && (
        <div data-testid={TEST_ATTRIBUTES.ERROR_MESSAGE}>{meta.error}</div>
      )}
    </>
  );
}
