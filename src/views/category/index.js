import { useState } from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { Header, Table } from 'components/common';
import { ActionTable, AddButton, SortTable } from 'components/ui';
import { DATE_FORMAT } from 'constants/common';
import { useCategoryPagination, useDeleteCategory } from 'hooks/api';
import { Routes } from 'routes';

const CategoryDetail = () => {
  const route = useRouter();

  const [createdAt, setCreatedAt] = useState();

  const { data, isLoading, pagination } = useCategoryPagination({
    createdAt
  });
  const { doRequest: onDelete, loading } = useDeleteCategory();

  const redirectToDetail = id => () => {
    route.push(Routes.CHI_TIET_LOAI.replace(':id', id));
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      render: id => <span className="cursor-pointer text-state-accent">{id}</span>,
      onCell: e => ({
        onClick: redirectToDetail(e.id)
      })
    },
    {
      title: 'Loại',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <SortTable title="Ngày tạo" onChange={setCreatedAt} />,
      key: 'createdAt',
      width: 170,
      render: ({ createdAt: _createdAt }) => {
        return <span>{dayjs(_createdAt).format(DATE_FORMAT.DATE_TIME)}</span>;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 110,
      render: ({ id }) => {
        return <ActionTable onConfirmDelete={() => onDelete({ uriParams: { id } })} onEdit={redirectToDetail(id)} />;
      }
    }
  ];

  const redirectToAddCategory = () => {
    route.push(Routes.THEM_LOAI);
  };

  return (
    <div>
      <Header className="justify-end">
        <AddButton onClick={redirectToAddCategory} />
      </Header>
      <Table dataSource={data} columns={columns} loading={isLoading || loading} pagination={pagination} />
    </div>
  );
};

export default CategoryDetail;
