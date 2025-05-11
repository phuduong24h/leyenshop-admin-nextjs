'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBasePagination, useBaseQuery } from 'hooks/base';
import { Routes } from 'routes';

export const usePromotionList = (params = {}) =>
  useBaseQuery({
    key: [API.PROMOTION.LIST, params],
    uri: API.PROMOTION.LIST,
    params
  });

export const usePromotionPagination = params =>
  useBasePagination({
    key: [API.PROMOTION.LIST, params],
    uri: API.PROMOTION.LIST,
    params
  });

export const usePromotionDetail = (id, options) =>
  useBaseQuery({
    key: [API.PROMOTION.DETAIL, id],
    uri: API.PROMOTION.DETAIL.replace(':id', id),
    options
  });

export const useCreatePromotion = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useBaseMutation({
    uri: API.PROMOTION.NEW,
    onSuccess: () => {
      toast.success('Thêm khuyến mãi thành công');
      queryClient.invalidateQueries({ queryKey: [API.PROMOTION.LIST], refetchType: 'all' });
      router.push(Routes.KHUYEN_MAI);
    }
  });
};

export const useUpdatePromotion = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.PROMOTION.DETAIL.replace(':id', id),
    method: 'PUT',
    onSuccess: () => {
      toast.success('Sửa khuyến mãi thành công');
      queryClient.invalidateQueries({ queryKey: [API.PROMOTION.LIST], refetchType: 'all' });
    }
  });
};

export const useDeletePromotion = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useBaseMutation({
    uri: API.PROMOTION.DETAIL,
    method: 'DELETE',
    onSuccess: () => {
      toast.success('Xoá khuyến mãi thành công');
      queryClient.invalidateQueries({ queryKey: [API.PROMOTION.LIST], refetchType: 'all' });
      router.push(Routes.THEM_KHUYEN_MAI);
    }
  });
};
