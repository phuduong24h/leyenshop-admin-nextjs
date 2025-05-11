import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBasePagination, useBaseQuery } from 'hooks/base';
import { Routes } from 'routes';

export const useUserList = () => useBaseQuery({ key: [API.USER.LIST], uri: API.USER.LIST });

export const useUserPagination = params =>
  useBasePagination({
    key: [API.USER.LIST, params],
    uri: API.USER.LIST,
    params
  });

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.USER.DETAIL,
    method: 'DELETE',
    onSuccess: () => {
      toast.success('Xoá khách hàng thành công');
      queryClient.invalidateQueries({ queryKey: [API.USER.LIST], refetchType: 'all' });
    }
  });
};

export const useUserDetail = (id, options) =>
  useBaseQuery({ key: [API.USER.DETAIL, id], uri: API.USER.DETAIL.replace(':id', id), options });

export const useUpdateUser = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.USER.DETAIL.replace(':id', id),
    method: 'PUT',
    onSuccess: () => {
      toast.success('Cập nhật khách hàng thành công');
      queryClient.invalidateQueries({ queryKey: [API.USER.LIST], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: [API.USER.DETAIL, id], refetchType: 'all' });
    }
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useBaseMutation({
    uri: API.USER.NEW,
    onSuccess: res => {
      toast.success('Tạo khách hàng thành công');
      queryClient.invalidateQueries({ queryKey: [API.USER.LIST], refetchType: 'all' });
      router.replace(Routes.CHI_TIET_KHACH_HANG.replace(':id', res.data.id));
    }
  });
};

export const useChangePassword = () => {
  return useBaseMutation({
    uri: API.USER.CHANGE_PASSWORD,
    method: 'PUT',
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công');
    }
  });
};
