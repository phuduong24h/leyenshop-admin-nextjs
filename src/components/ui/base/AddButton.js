import { IoMdAdd } from 'react-icons/io';

import { Button } from 'components/form';
import { cn } from 'utils';

const AddButton = ({ label = 'Thêm', className, ...props }) => {
  return (
    <Button className={cn('gap-2', className)} {...props}>
      <IoMdAdd />
      <span>{label}</span>
    </Button>
  );
};

export default AddButton;
