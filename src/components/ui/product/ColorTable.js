'use client';

import { useState } from 'react';

import { Header, Images, Table } from 'components/common';
import { FormWrapper } from 'components/form';
import { useColorPagination, useDeleteColor } from 'hooks/api';
import { useFlag } from 'hooks/base';

import ColorModal from './ColorModal';
import { AddButton } from '../base';
import { ActionTable } from '../table';

const ColorTable = ({ productId }) => {
  const [visibleColor, onShowColor, onHideColor] = useFlag();

  const [colorId, setColorId] = useState();

  const { data, pagination } = useColorPagination({
    productId
  });
  const { doRequest: onDelete, loading: loadingDelete } = useDeleteColor();

  const onEdit = id => () => {
    setColorId(id);
    onShowColor();
  };

  const afterCloseModal = () => {
    setColorId();
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
          <FormWrapper.Title title="Màu sắc" column />
          <AddButton onClick={onShowColor} />
        </Header>
        <Table columns={columns} dataSource={data} pagination={pagination} loading={loadingDelete} />
      </div>
      <ColorModal
        open={visibleColor}
        onCancel={onHideColor}
        afterClose={afterCloseModal}
        id={colorId}
        productId={productId}
      />
    </>
  );
};

export default ColorTable;
