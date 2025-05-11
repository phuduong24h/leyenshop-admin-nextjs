import { API } from 'constants/common';
import { useBaseQuery } from 'hooks/base';

export const useRoleList = (params, options) =>
  useBaseQuery({
    key: [API.ROLE.LIST, params],
    uri: API.ROLE.LIST,
    params,
    options
  });
