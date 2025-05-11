'use client';

import type { ReactNode } from 'react';

import { Spin } from 'antd';

import { cn } from 'utils';

interface IButton extends React.ComponentPropsWithoutRef<'button'> {
  label?: string;
  className?: string;
  variant?: 'default' | 'outline';
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode | ReactNode[];
}

const Button = ({ label, className, variant, isLoading, disabled, children, ...rest }: IButton) => {
  const renderContent = () => {
    if (isLoading) {
      return <Spin />;
    }
    if (label) {
      return label;
    }
    return children;
  };

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={cn(
        'flex h-8 min-w-14 items-center justify-center rounded-md bg-primary px-4 py-1 font-medium text-text-on-primary',
        'transition active:scale-95',
        variant === 'outline' && 'border border-primary bg-transparent text-text-primary',
        disabled && 'bg-background-disable text-text-disable',
        (disabled || isLoading) && 'cursor-not-allowed',
        className
      )}
      {...rest}>
      {renderContent()}
    </button>
  );
};

export default Button;
