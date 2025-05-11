import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBasePagination, useBaseQuery } from 'hooks/base';

export const useColorList = () =>
  useBaseQuery({
    key: [API.COLOR.LIST],
    uri: API.COLOR.LIST
  });

export const useColorPagination = params =>
  useBasePagination({
    key: [API.COLOR.LIST, params],
    uri: API.COLOR.LIST,
    params
  });

export const useColorDetail = (id, params, options) =>
  useBaseQuery({
    key: [API.COLOR.DETAIL, id],
    uri: API.COLOR.DETAIL.replace(':id', id),
    params,
    options
  });

export const useCreateColor = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.COLOR.NEW,
    onSuccess: () => {
      toast.success('Thêm màu thành công');
      queryClient.invalidateQueries({ queryKey: [API.COLOR.LIST], refetchType: 'all' });
    }
  });
};

export const useUpdateColor = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.COLOR.DETAIL.replace(':id', id),
    method: 'PUT',
    onSuccess: () => {
      toast.success('Sửa màu thành công');
      queryClient.invalidateQueries({ queryKey: [API.COLOR.LIST], refetchType: 'all' });
    }
  });
};

export const useDeleteColor = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.COLOR.DETAIL,
    method: 'DELETE',
    onSuccess: () => {
      toast.success('Xoá màu thành công');
      queryClient.invalidateQueries({ queryKey: [API.COLOR.LIST], refetchType: 'all' });
    }
  });
};
