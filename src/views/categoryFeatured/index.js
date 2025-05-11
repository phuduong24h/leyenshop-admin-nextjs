import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { Header, Table } from 'components/common';
import { ActionTable, AddButton, SortTable } from 'components/ui';
import { DATE_FORMAT } from 'constants/common';
import { useCategoryFeaturedPagination, useDeleteCategoryFeatured } from 'hooks/api';
import { Routes } from 'routes';

const CategoryFeatured = () => {
  const route = useRouter();

  const { data, isLoading, pagination } = useCategoryFeaturedPagination();
  const { doRequest: onDelete, loading } = useDeleteCategoryFeatured();

  const redirectToDetail = id => () => {
    route.push(Routes.CHI_TIET_LOAI_NOI_BAT.replace(':id', id));
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
      title: 'Loại ',
      dataIndex: 'category',
      key: 'category',
      render: ({ name }) => {
        return <span>{name}</span>;
      }
    },
    {
      title: <SortTable title="Ngày tạo" />,
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
    route.push(Routes.THEM_LOAI_NOI_BAT);
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

export default CategoryFeatured;
