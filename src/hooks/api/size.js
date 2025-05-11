import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation, useBasePagination, useBaseQuery } from 'hooks/base';

export const useSizeList = () =>
  useBaseQuery({
    key: [API.SIZE.LIST],
    uri: API.SIZE.LIST
  });

export const useSizePagination = params =>
  useBasePagination({
    key: [API.SIZE.LIST, params],
    uri: API.SIZE.LIST,
    params
  });

export const useSizeDetail = (id, params, options) =>
  useBaseQuery({
    key: [API.SIZE.DETAIL, id],
    uri: API.SIZE.DETAIL.replace(':id', id),
    params,
    options
  });

export const useCreateSize = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.SIZE.NEW,
    onSuccess: () => {
      toast.success('Thêm kích thước thành công');
      queryClient.invalidateQueries({ queryKey: [API.SIZE.LIST], refetchType: 'all' });
    }
  });
};

export const useUpdateSize = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.SIZE.DETAIL.replace(':id', id),
    method: 'PUT',
    onSuccess: () => {
      toast.success('Sửa kích thước thành công');
      queryClient.invalidateQueries({ queryKey: [API.SIZE.LIST], refetchType: 'all' });
    }
  });
};

export const useDeleteSize = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.SIZE.DETAIL,
    method: 'DELETE',
    onSuccess: () => {
      toast.success('Xoá kích thước thành công');
      queryClient.invalidateQueries({ queryKey: [API.SIZE.LIST], refetchType: 'all' });
    }
  });
};
