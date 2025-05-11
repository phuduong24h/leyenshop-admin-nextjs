'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBasePagination, useBaseQuery } from 'hooks/base';
import { Routes } from 'routes';

export const useProductPagination = params =>
  useBasePagination({ key: [API.PRODUCT.LIST, params], uri: API.PRODUCT.LIST, params });

export const useProductList = () => useBaseQuery({ key: [API.PRODUCT.LIST], uri: API.PRODUCT.LIST });

export const useProductDetail = (id, options) =>
  useBaseQuery({ key: [API.PRODUCT.DETAIL, id], uri: API.PRODUCT.DETAIL.replace(':id', id), options });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useBaseMutation({
    uri: API.PRODUCT.NEW,
    onSuccess: async res => {
      toast.success('Tạo loại thành công');
      queryClient.invalidateQueries({ queryKey: [API.PRODUCT.LIST], refetchType: 'all' });
      router.replace(Routes.CHI_TIET_SAN_PHAM.replace(':id', res.data.id));
    }
  });
};

export const useUpdateProduct = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.PRODUCT.DETAIL.replace(':id', id),
    method: 'PUT',
    onSuccess: async () => {
      toast.success('Cập nhật loại thành công');
      queryClient.invalidateQueries({ queryKey: [API.PRODUCT.DETAIL, id], refetchType: 'all' });
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.PRODUCT.DETAIL,
    method: 'DELETE',
    onSuccess: () => {
      toast.success('Xoá sản phẩm thành công');
      queryClient.invalidateQueries({ queryKey: [API.PRODUCT.LIST], refetchType: 'all' });
    }
  });
};
