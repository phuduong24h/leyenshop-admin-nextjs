'use client';

import { FormikConfig, FormikValues, useFormik } from 'formik';
import { get } from 'lodash';

export function useValidate<Values extends FormikValues>(props: FormikConfig<Values>) {
  const { setFieldTouched, setFieldValue, touched, errors, ...rest } = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnChange: true,
    ...props
  });

  const onChange = (field: string) => (value: any) => {
    const text = get(value, 'target.value', value);

    setFieldValue(field, text);
    setFieldTouched(field, true, false);
  };

  const onBlur = (field: string) => (value: any) => {
    const text = get(value, 'target.value', value);

    setFieldValue(field, text);
    setFieldTouched(field, false, true);
  };

  const error = (field: string) => {
    return touched[field] && errors[field];
  };

  return {
    onChange,
    error,
    onBlur,
    setFieldTouched,
    setFieldValue,
    touched,
    errors,
    ...rest
  };
}
