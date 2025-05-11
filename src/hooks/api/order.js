'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBasePagination, useBaseQuery } from 'hooks/base';
import { Routes } from 'routes';

export const useOrderPagination = params =>
  useBasePagination({
    key: [API.ORDER.LIST, params],
    uri: API.ORDER.LIST,
    params
  });

export const useOrderDetail = (id, options) =>
  useBaseQuery({
    key: [API.ORDER.DETAIL, id],
    uri: API.ORDER.DETAIL.replace(':id', id),
    options
  });

export const useCreateOrder = () => {
  const route = useRouter();
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.ORDER.NEW,
    onSuccess: res => {
      toast.success('Thêm đơn hàng thành công');
      route.replace(Routes.CHI_TIET_DON_HANG.replace(':id', res?.data?.id));
      queryClient.invalidateQueries({ queryKey: [API.ORDER.LIST], refetchType: 'all' });
    }
  });
};

export const useUpdateOrder = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.ORDER.DETAIL.replace(':id', id),
    method: 'PUT',
    onSuccess: () => {
      toast.success('Cập nhật đơn hàng thành công');
      queryClient.invalidateQueries({ queryKey: [API.ORDER.LIST], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: [API.ORDER.DETAIL, id] });
    }
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.ORDER.DETAIL,
    method: 'DELETE',
    onSuccess: () => {
      toast.success('Xoá đơn hàng thành công');
      queryClient.invalidateQueries({ queryKey: [API.ORDER.LIST], refetchType: 'all' });
    }
  });
};

export const useGetTotalPrice = (id, options) =>
  useBaseQuery({
    key: [API.ORDER.TOTAL_PRICE, id],
    uri: API.ORDER.TOTAL_PRICE.replace(':id', id),
    options
  });
