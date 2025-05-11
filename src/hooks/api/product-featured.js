import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation } from 'hooks/base';

export const useNewProductFeatured = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.PRODUCT_FEATURED.DETAIL.replace(':id', id),
    onSuccess: async () => {
      toast.success('Thêm sản phẩm thành công');
      queryClient.invalidateQueries({ queryKey: [API.CATEGORY_FEATURED.DETAIL, id], refetchType: 'all' });
    }
  });
};

export const useDeleteProductFeatured = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.PRODUCT_FEATURED.DETAIL,
    method: 'DELETE',
    onSuccess: async () => {
      toast.success('Xoá sản phẩm thành công');
      queryClient.invalidateQueries({ queryKey: [API.CATEGORY_FEATURED.DETAIL, id], refetchType: 'all' });
    }
  });
};
