import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBasePagination, useBaseQuery } from 'hooks/base';

export const useOrderProductPagination = (id, params, options) =>
  useBasePagination({
    key: [API.ORDER_PRODUCT.LIST, id, params],
    uri: API.ORDER_PRODUCT.LIST.replace(':id', id),
    params,
    options
  });

export const useOrderProductDetail = (id, options) =>
  useBaseQuery({
    key: [API.ORDER_PRODUCT.DETAIL, id],
    uri: API.ORDER_PRODUCT.DETAIL.replace(':id', id),
    options
  });

export const useCreateOrderProduct = orderId => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.ORDER_PRODUCT.DETAIL.replace(':id', orderId),
    onSuccess: () => {
      toast.success('Thêm sản phẩm thành công');
      queryClient.invalidateQueries({ queryKey: [API.ORDER_PRODUCT.LIST, orderId], refetchType: 'all' });
    }
  });
};

export const useUpdateOrderProduct = (id, orderId) => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.ORDER_PRODUCT.DETAIL.replace(':id', id),
    method: 'PUT',
    onSuccess: () => {
      toast.success('Cập nhật sản phẩm thành công');
      queryClient.invalidateQueries({ queryKey: [API.ORDER_PRODUCT.LIST, orderId], refetchType: 'all' });
    }
  });
};

export const useDeleteOrderProduct = orderId => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.ORDER_PRODUCT.DETAIL,
    method: 'DELETE',
    onSuccess: () => {
      toast.success('Xoá sản phẩm thành công');
      queryClient.invalidateQueries({ queryKey: [API.ORDER_PRODUCT.LIST, orderId], refetchType: 'all' });
    }
  });
};
