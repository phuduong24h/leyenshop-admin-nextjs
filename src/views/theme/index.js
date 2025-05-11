'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { Header, Table } from 'components/common';
import { Button } from 'components/form';
import { ActionTable, AddButton, SortTable } from 'components/ui';
import { DATE_FORMAT } from 'constants/common';
import { useDeleteTheme, useThemePagination } from 'hooks/api';
import { Routes } from 'routes';

const Theme = () => {
  const router = useRouter();

  const { data, pagination, isLoading } = useThemePagination();
  const { doRequest: onDelete, loading: loadingDelete } = useDeleteTheme();

  const redirectToAddTheme = () => {
    router.push(Routes.THEM_THEME);
  };

  const redirectToDetail = id => () => {
    router.push(Routes.CHI_TIET_THEME.replace(':id', id));
  };

  const renderTheme = (item, index) => {
    const { name, color } = item;
    return (
      <div
        key={`name${index}`}
        className="flex flex-col items-center justify-center gap-1 overflow-hidden rounded-[4px] px-1.5 text-white"
        style={{ backgroundColor: color }}>
        <p>{color}</p>
        <p>{name}</p>
      </div>
    );
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
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: 'Màu sắc',
      dataIndex: 'themes',
      key: 'themes',
      render: themes => (
        <div className="flex flex-wrap items-start gap-2 overflow-hidden">{themes?.map?.(renderTheme)}</div>
      )
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
        return <ActionTable onEdit={redirectToDetail(id)} onConfirmDelete={() => onDelete({ uriParams: { id } })} />;
      }
    }
  ];

  return (
    <div>
      <Header className="flex justify-end">
        <div className="flex items-center gap-x-3">
          <Button variant="outline">Save</Button>
          <AddButton onClick={redirectToAddTheme} />
        </div>
      </Header>
      <Table columns={columns} pagination={pagination} loading={isLoading} dataSource={data} />
    </div>
  );
};

export default Theme;
