'use client';

import { useState } from 'react';

import { Header, Images, Table } from 'components/common';
import { FormWrapper } from 'components/form';
import { useDeleteSize, useSizePagination } from 'hooks/api';
import { useFlag } from 'hooks/base';

import SizeModal from './SizeModal';
import { AddButton } from '../base';
import { ActionTable } from '../table';

const SizeTable = ({ productId }) => {
  const [visibleSize, onShowSize, onHideSize] = useFlag();

  const [sizeId, setSizeId] = useState();

  const { data, pagination } = useSizePagination({
    productId
  });
  const { doRequest: onDelete, loading: loadingDelete } = useDeleteSize();

  const onEdit = id => () => {
    setSizeId(id);
    onShowSize();
  };

  const afterCloseModal = () => {
    setSizeId();
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      render: id => <span className="text-admin-text-2">{id}</span>,
      onCell: e => ({
        onClick: onEdit(e.id)
      })
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Ảnh',
      dataIndex: 'files',
      key: 'files',
      width: '50%',
      render: files => <Images data={files} height={70} />
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 110,
      render: ({ id }) => {
        return <ActionTable onConfirmDelete={() => onDelete({ uriParams: { id } })} onEdit={onEdit(id)} />;
      }
    }
  ];

  return (
    <>
      <div>
        <Header className="mb-2">
          <FormWrapper.Title title="Kích thước" column />
          <AddButton onClick={onShowSize} />
        </Header>
        <Table columns={columns} dataSource={data} pagination={pagination} loading={loadingDelete} />
      </div>
      <SizeModal
        open={visibleSize}
        onCancel={onHideSize}
        afterClose={afterCloseModal}
        id={sizeId}
        productId={productId}
      />
    </>
  );
};

export default SizeTable;
