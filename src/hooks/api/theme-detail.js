import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation } from 'hooks/base';

export const useDeleteThemeDetail = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.THEME_DETAIL.DETAIL,
    method: 'DELETE',
    onSuccess: () => {
      toast.success('Xoá thành công');
      queryClient.invalidateQueries({ queryKey: [API.THEME.DETAIL], refetchType: 'all' });
    }
  });
};
