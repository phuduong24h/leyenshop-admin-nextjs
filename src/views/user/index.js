'use client';

import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import { Header, Images, Table } from 'components/common';
import { ActionTable, AddButton, ChangePasswordModal } from 'components/ui';
import { useDeleteUser, useUserPagination } from 'hooks/api';
import { useFlag } from 'hooks/base';
import { Routes } from 'routes';

const User = () => {
  const route = useRouter();
  const { data, pagination, isLoading } = useUserPagination();
  const { doRequest: doDeleteUser, loading: loadingDeleteUser } = useDeleteUser();

  const [visibleChangePw, onShowChangePw, onHideChangePw] = useFlag();
  const userId = useRef();

  const redirectToDetail = id => () => {
    route.push(Routes.CHI_TIET_KHACH_HANG.replace(':id', id));
  };

  const redirectToAddUser = () => {
    route.push(Routes.THEM_KHACH_HANG);
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
      title: 'Hình ảnh',
      dataIndex: 'file',
      key: 'file',
      render: file => {
        if (file) return <Images data={[file]} height={70} />;
        return null;
      }
    },
    {
      title: 'Tên',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 205,
      render: ({ id }) => {
        return (
          <div className="flex items-center gap-2">
            <ActionTable onEdit={redirectToDetail(id)} onConfirmDelete={() => doDeleteUser({ uriParams: { id } })} />
            <div className="h-3 w-px bg-border-primary" />
            <span
              className="text-state-accent"
              aria-hidden
              onClick={() => {
                onShowChangePw();
                userId.current = id;
              }}>
              Đổi mật khẩu
            </span>
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <Header className="flex justify-end">
        <AddButton onClick={redirectToAddUser} />
      </Header>
      <Table dataSource={data} columns={columns} pagination={pagination} loading={isLoading || loadingDeleteUser} />
      <ChangePasswordModal open={visibleChangePw} onCancel={onHideChangePw} userId={userId.current} />
    </div>
  );
};

export default User;
