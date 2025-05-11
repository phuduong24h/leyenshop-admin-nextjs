import { FieldHelperProps, FieldInputProps, FieldMetaProps } from 'formik';

export interface FormWrapperProps {
  name?: string;
  title?: string;
  required?: boolean;
  error?: string;
  description?: string;
  children: React.ReactElement;
  column?: boolean;

  formWrapperClassName?: string;
  formClassName?: string;
  titleWrapperClassName?: string;
  titleClassName?: string;
  separatorClassName?: string;
  requiredClassName?: string;
  errorClassName?: string;
  descriptionClassName?: string;

  hideErrorMessage?: boolean;
}

export interface FormikProps {
  field?: FieldInputProps<object>;
  meta?: FieldMetaProps<object>;
  helpers?: FieldHelperProps<object>;
}
