'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBasePagination, useBaseQuery } from 'hooks/base';
import { Routes } from 'routes';

export const useCategoryPagination = params =>
  useBasePagination({
    key: [API.CATEGORY.LIST, params],
    uri: API.CATEGORY.LIST,
    params
  });

export const useCategoryList = params =>
  useBaseQuery({
    key: [API.CATEGORY.LIST, params],
    uri: API.CATEGORY.LIST,
    params
  });

export const useCategoryDetail = (id, options) =>
  useBaseQuery({
    key: [API.CATEGORY.DETAIL, id],
    uri: API.CATEGORY.DETAIL.replace(':id', id),
    options: {
      ...options,
      refetchOnMount: true
    }
  });

export const useNewCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useBaseMutation({
    uri: API.CATEGORY.NEW,
    onSuccess: async res => {
      toast.success('Tạo loại thành công');
      router.replace(Routes.CHI_TIET_LOAI.replace(':id', res?.data?.id));
      queryClient.invalidateQueries({ queryKey: [API.CATEGORY.LIST], refetchType: 'all' });
    }
  });
};

export const useUpdateCategory = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.CATEGORY.DETAIL.replace(':id', id),
    method: 'PUT',
    onSuccess: () => {
      toast.success('Sửa loại thành công');
      queryClient.invalidateQueries({ queryKey: [API.CATEGORY.LIST], refetchType: 'all' });
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.CATEGORY.DETAIL,
    method: 'DELETE',
    onSuccess: () => {
      toast.success('Xoá loại thành công');
      queryClient.invalidateQueries({ queryKey: [API.CATEGORY.LIST], refetchType: 'all' });
    }
  });
};
