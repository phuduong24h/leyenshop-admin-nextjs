'use client';

import { SelectProps as AntdSelectProps, Select as SelectAntd } from 'antd';
import { FormWrapperProps } from 'types';

import { cn } from 'utils';

import styles from './styles.module.scss';
import FormWrapper from '../FormWrapper';

interface SelectProps extends Omit<AntdSelectProps, 'children'>, FormWrapperProps {
  name?: string;
}

const SelectBase = ({ className, ...props }: SelectProps) => {
  return <SelectAntd className={cn('size-form', styles.container, className)} {...props} />;
};

const Select = (props: SelectProps) => {
  return (
    <FormWrapper {...props}>
      <SelectBase {...props} />
    </FormWrapper>
  );
};

export default Select;
