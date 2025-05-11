import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBaseQuery } from 'hooks/base';

export const useBannerList = () =>
  useBaseQuery({
    key: [API.BANNER.LIST],
    uri: API.BANNER.LIST
  });

export const useAddBanner = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.BANNER.NEW,
    onSuccess: () => {
      toast.success('Thêm ảnh bìa thành công');
      queryClient.invalidateQueries({ queryKey: [API.BANNER.LIST], refetchType: 'all' });
    }
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    method: 'DELETE',
    uri: API.BANNER.DETAIL,
    onSuccess: () => {
      toast.success('Xóa ảnh bìa thành công');
      queryClient.invalidateQueries({ queryKey: [API.BANNER.LIST], refetchType: 'all' });
    }
  });
};
