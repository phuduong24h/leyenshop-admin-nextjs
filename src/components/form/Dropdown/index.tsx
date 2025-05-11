'use client';

import { useState } from 'react';

import { Button, Dropdown as AntdDropdown, DropDownProps as AntdDropdownProps } from 'antd';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FormWrapperProps } from 'types';

import { cn } from 'utils';

import styles from './styles.module.scss';
import FormWrapper from '../FormWrapper';

interface DropdownProps extends Omit<AntdDropdownProps, 'children'>, FormWrapperProps {
  placeholder: string;
}

const DropdownBase = ({ placeholder, className, ...props }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = (value: boolean) => setIsOpen(value);

  return (
    <AntdDropdown className={cn(styles.container, className)} {...props} onOpenChange={onOpenChange}>
      <Button>
        <span>{placeholder}</span>
        <div className={cn(`transform transition-transform duration-300`, isOpen ? 'rotate-180' : 'rotate-0')}>
          {isOpen ? <IoIosArrowUp className={styles.icon} /> : <IoIosArrowDown className={styles.icon} />}
        </div>
      </Button>
    </AntdDropdown>
  );
};

const Dropdown = (props: DropdownProps) => {
  return (
    <FormWrapper {...props}>
      <DropdownBase {...props} />
    </FormWrapper>
  );
};

export default Dropdown;
