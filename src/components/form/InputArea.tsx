'use client';

import { memo, TextareaHTMLAttributes } from 'react';

import { FormWrapperProps } from 'types';

import { cn } from 'utils';

import FormWrapper from './FormWrapper';

interface InputAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'>, FormWrapperProps {
  className?: string;
}

const InputAreaBase = ({ className, error, ...rest }: InputAreaProps) => {
  return (
    <textarea
      className={cn(
        'size-form block h-full rounded border border-border-primary bg-background-primary px-3 py-1.5 outline-none',
        'disabled:bg-background-disable disabled:text-text-disable disabled:shadow-none disabled:hover:cursor-not-allowed',
        error && 'border border-state-error',
        className
      )}
      autoCapitalize="off"
      spellCheck="false"
      autoComplete="off"
      autoCorrect="off"
      rows={4}
      {...rest}
    />
  );
};

const InputArea = (props: InputAreaProps) => {
  return (
    <FormWrapper {...props}>
      <InputAreaBase {...props} />
    </FormWrapper>
  );
};

InputArea.Base = InputAreaBase;
export default memo(InputArea);
