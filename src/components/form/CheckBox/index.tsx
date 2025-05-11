'use client';

import { Checkbox, CheckboxProps } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FormikProps, FormWrapperProps } from 'types';

import { cn } from 'utils';

import styles from './styles.module.scss';
import FormWrapper from '../FormWrapper';

interface CheckBoxProps extends Omit<CheckboxProps, 'children'>, FormWrapperProps {
  label?: string;
}

const CheckBoxBase = ({ label, className, value, onChange, ...props }: CheckBoxProps & FormikProps) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    e.target.value = e.target.checked;
    onChange?.(e);
  };

  return (
    <Checkbox checked={value} onChange={handleChange} className={cn(styles.customCheckbox, className)} {...props}>
      <span className="text-xs">{label}</span>
    </Checkbox>
  );
};

const CheckBox = (props: CheckBoxProps) => {
  return (
    <FormWrapper {...props}>
      <CheckBoxBase {...props} />
    </FormWrapper>
  );
};

export default CheckBox;
