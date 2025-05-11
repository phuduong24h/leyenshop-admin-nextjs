'use client';

import { cn } from 'utils';

const Header = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('mb-6 flex w-full items-center justify-between gap-4', className)}>{children}</div>;
};

export default Header;
