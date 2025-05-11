'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBasePagination, useBaseQuery } from 'hooks/base';
import { Routes } from 'routes';

export const useCategoryFeaturedDetail = (id, options) =>
  useBaseQuery({
    key: [API.CATEGORY_FEATURED.DETAIL, id],
    uri: API.CATEGORY_FEATURED.DETAIL.replace(':id', id),
    options: {
      ...options,
      refetchOnMount: true
    }
  });

export const useCategoryFeaturedPagination = params =>
  useBasePagination({
    key: [API.CATEGORY_FEATURED.LIST, params],
    uri: API.CATEGORY_FEATURED.LIST,
    params
  });

export const useNewCategoryFeatured = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useBaseMutation({
    uri: API.CATEGORY_FEATURED.NEW,
    onSuccess: async res => {
      toast.success('Tạo loại nổi bật thành công');
      router.replace(Routes.CHI_TIET_LOAI_NOI_BAT.replace(':id', res?.data?.categoryFeaturedId));
      queryClient.invalidateQueries({ queryKey: [API.CATEGORY_FEATURED.LIST], refetchType: 'all' });
    }
  });
};

export const useDeleteCategoryFeatured = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.CATEGORY_FEATURED.DETAIL,
    method: 'DELETE',
    onSuccess: async () => {
      toast.success('Xoá loại nổi bật thành công');
      queryClient.invalidateQueries({ queryKey: [API.CATEGORY_FEATURED.LIST], refetchType: 'all' });
    }
  });
};

export const useUpdateCategoryFeatured = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.CATEGORY_FEATURED.DETAIL.replace(':id', id),
    method: 'PUT',
    onSuccess: async () => {
      toast.success('Sửa loại nổi bật thành công');
      queryClient.invalidateQueries({ queryKey: [API.CATEGORY_FEATURED.DETAIL, id], refetchType: 'all' });
    }
  });
};
