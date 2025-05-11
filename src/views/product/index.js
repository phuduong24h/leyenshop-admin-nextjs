'use client';

import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Header, Table } from 'components/common';
import { Select } from 'components/form';
import { AddButton } from 'components/ui';
import { useCategoryList, useColorList, useDeleteProduct, useProductPagination, useSizeList } from 'hooks/api';
import { useProductTable } from 'hooks/custom';
import { Routes } from 'routes';

const Product = () => {
  const route = useRouter();

  const { data: { data: categories } = {}, loading: loadingCategory } = useCategoryList();
  const { data: { data: colors } = {}, loading: loadingColor } = useColorList();
  const { data: { data: sizes } = {}, loading: loadingSize } = useSizeList();

  const [query, setQuery] = useState({
    categoryIds: undefined,
    colorIds: undefined,
    sizeIds: undefined
  });
  const [createdAt, setCreatedAt] = useState();
  const { data, pagination, isLoading } = useProductPagination({ createdAt, ...query });
  const { doRequest: onDelete, loading: loadingDelete } = useDeleteProduct();

  const redirectToAddProduct = () => {
    route.push(Routes.THEM_SAN_PHAM);
  };

  const redirectToDetail = id => {
    route.push(Routes.CHI_TIET_SAN_PHAM.replace(':id', id));
  };

  const onChangeQuery = (key, value) => {
    setQuery(prev => ({ ...prev, [key]: value }));
  };

  const categoryOptions = useMemo(() => categories?.map?.(x => ({ label: x?.name, value: x?.id })), [categories]);
  const colorOptions = useMemo(() => colors?.map?.(x => ({ label: x?.name, value: x?.id })), [colors]);
  const sizeOptions = useMemo(() => sizes?.map?.(x => ({ label: x?.name, value: x?.id })), [sizes]);

  const { columns } = useProductTable({
    redirectToDetail,
    onDelete: id => onDelete({ uriParams: { id } }),
    onEdit: redirectToDetail,
    setCreatedAt
  });

  return (
    <div>
      <Header className="justify-end">
        <Select
          allowClear
          options={categoryOptions}
          mode="multiple"
          placeholder="Chọn loại"
          maxTagCount="responsive"
          loading={loadingCategory}
          formWrapperClassName="w-[154px]"
          onChange={e => onChangeQuery('categoryIds', e)}
        />
        <Select
          allowClear
          options={colorOptions}
          mode="multiple"
          placeholder="Chọn màu"
          loading={loadingColor}
          formWrapperClassName="w-[154px]"
          onChange={e => onChangeQuery('colorIds', e)}
        />
        <Select
          allowClear
          options={sizeOptions}
          mode="multiple"
          placeholder="Chọn kích thước"
          loading={loadingSize}
          formWrapperClassName="w-[154px]"
          onChange={e => onChangeQuery('sizeIds', e)}
        />
        <AddButton onClick={redirectToAddProduct} />
      </Header>
      <Table dataSource={data} columns={columns} pagination={pagination} loading={isLoading || loadingDelete} />
    </div>
  );
};

export default Product;
