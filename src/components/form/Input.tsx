'use client';

import { InputHTMLAttributes, useState } from 'react';

import { IoMdEyeOff } from 'react-icons/io';
import { IoEye } from 'react-icons/io5';
import { FormikProps, FormWrapperProps } from 'types';

import { cn } from 'utils';

import FormWrapper from './FormWrapper';

interface InputProps extends FormWrapperProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
  left: React.ReactNode;
  right?: React.ReactNode;
  isPassword?: boolean;
  wrapperClassName?: string;
  className?: string;
}

const InputBase = ({
  type,
  left,
  right,
  isPassword,
  error,
  className,
  wrapperClassName,
  ...rest
}: InputProps & FormikProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn('size-form relative flex items-center gap-1 ease-linear', wrapperClassName)}>
      {!!left && <div className="absolute inset-y-0 left-0 pl-3">{left}</div>}
      <input
        type={isPassword && !showPassword ? 'password' : type}
        className={cn(
          'block size-full flex-1 rounded border border-border-primary bg-background-primary px-3 outline-none',
          'placeholder:text-text-4',
          'focus:shadow-input focus:border-primary',
          'disabled:bg-background-disable disabled:text-text-disable disabled:shadow-none disabled:hover:cursor-not-allowed',
          error && 'border border-state-error',
          left && 'pl-9',
          right && 'pr-9',
          className
        )}
        autoCapitalize="off"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        {...rest}
      />
      {!!isPassword && (
        <button
          className="absolute right-3 cursor-pointer text-gray-500 hover:text-primary"
          onClick={() => setShowPassword(!showPassword)}
          type="button">
          {showPassword ? <IoEye size={20} /> : <IoMdEyeOff size={20} />}
        </button>
      )}
      {!!right && <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-3">{right}</div>}
    </div>
  );
};

const Input = (props: InputProps) => {
  return (
    <FormWrapper {...props}>
      <InputBase {...props} />
    </FormWrapper>
  );
};

Input.Base = InputBase;
export default Input;
