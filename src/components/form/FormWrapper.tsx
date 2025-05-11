'use client';

import { Children, cloneElement } from 'react';

import { useField } from 'formik';
import { get } from 'lodash';
import { FormikProps, FormWrapperProps } from 'types';

import { cn } from 'utils';

const Title = ({
  title,
  column,
  required,
  wrapperClassName,
  className,
  requiredClassName,
  separatorClassName
}: {
  title: string;
  column?: boolean;
  required?: boolean;
  wrapperClassName?: string;
  className?: string;
  requiredClassName?: string;
  separatorClassName?: string;
}) => {
  return (
    <label htmlFor={title} className={cn('mt-1.5 flex w-[150px]', column && 'mt-0 w-full', wrapperClassName)}>
      <span className={cn('shrink-1 line-clamp-2 overflow-hidden text-ellipsis', className)}>{title}</span>
      {!!required && <span className={cn('ml-0.5 text-state-error', requiredClassName)}>*</span>}
      {!column && <span className={cn('ml-auto', separatorClassName)}>:</span>}
    </label>
  );
};

const FormWrapper = ({
  name,
  title,
  required,
  error,
  description,
  children,
  column,
  //
  formWrapperClassName,
  formClassName,
  titleWrapperClassName,
  titleClassName,
  requiredClassName,
  separatorClassName,
  errorClassName,
  descriptionClassName,
  //
  hideErrorMessage,
  ...props
}: FormWrapperProps) => {
  const child = Children.only(children);

  const render = ({ field, meta, helpers }: FormikProps = {}) => {
    const _error = meta?.error && meta?.touched ? meta.error : error;
    const onChange = (e: React.ChangeEvent<any>) => {
      const text = get(e, 'target.value', e);

      helpers?.setValue?.(text, true);
      helpers?.setTouched?.(true, false);
    };

    return (
      <div className={cn('flex w-full gap-1', column && 'flex-col gap-2', formWrapperClassName)}>
        {!!title && (
          <Title
            title={title}
            column={column}
            required={required}
            wrapperClassName={titleWrapperClassName}
            className={titleClassName}
            requiredClassName={requiredClassName}
            separatorClassName={separatorClassName}
          />
        )}
        <div className={cn('w-full', formClassName)}>
          {cloneElement(child, {
            ...field,
            ...meta,
            ...helpers,
            onChange,
            ...props,
            error: _error
          })}
          {!hideErrorMessage && !!_error && (
            <p className={cn('ml-2 mt-1 text-xs text-state-error', errorClassName)}>{_error}</p>
          )}
          {!!description && (
            <p className={cn('ml-2 mt-1 text-xs text-text-secondary', descriptionClassName)}>{description}</p>
          )}
        </div>
      </div>
    );
  };

  if (!name) {
    return render();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [field, meta, helpers] = useField({ name });

  return render({ field, meta, helpers });
};

FormWrapper.Title = Title;
export default FormWrapper;
