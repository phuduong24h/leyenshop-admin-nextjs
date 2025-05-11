import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBaseQuery } from 'hooks/base';

export const useGetWebInfo = () =>
  useBaseQuery({
    key: [API.WEB.INFO],
    uri: API.WEB.INFO
  });

export const useUpdateWebInfo = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.WEB.INFO,
    method: 'PUT',
    onSuccess: () => {
      toast.success('Cập nhật thành công');
      queryClient.invalidateQueries({ queryKey: [API.WEB.INFO], refetchType: 'all' });
    }
  });
};
