'use client';

import { use } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBasePagination, useBaseQuery } from 'hooks/base';
import { Routes } from 'routes';

export const useThemePagination = params =>
  useBasePagination({
    key: [API.THEME.LIST],
    uri: API.THEME.LIST,
    params
  });

export const useThemeDetail = (id, options) =>
  useBaseQuery({
    key: [API.THEME.DETAIL, id],
    uri: API.THEME.DETAIL.replace(':id', id),
    options
  });

export const useCreateTheme = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.THEME.NEW,
    onSuccess: res => {
      toast.success('Thêm thành công');
      queryClient.invalidateQueries({ queryKey: [API.THEME.LIST], refetchType: 'all' });
      router.replace(Routes.CHI_TIET_THEME.replace(':id', res.data.id));
    }
  });
};

export const useUpdateTheme = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.THEME.DETAIL.replace(':id', id),
    method: 'PUT',
    onSuccess: () => {
      toast.success('Cập nhật thành công');
      queryClient.invalidateQueries({ queryKey: [API.THEME.LIST], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: [API.THEME.DETAIL, id], refetchType: 'all' });
    }
  });
};

export const useDeleteTheme = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.THEME.DETAIL,
    method: 'DELETE',
    onSuccess: () => {
      toast.success('Xoá thành công');
      queryClient.invalidateQueries({ queryKey: [API.THEME.LIST], refetchType: 'all' });
    }
  });
};
